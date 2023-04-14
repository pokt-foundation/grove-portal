import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { useActionData, useCatch, useLoaderData } from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import ContactSalesView, { links as ContactSalesViewLinks } from "./view"
import { initCmsClient } from "~/models/cms/cms.server"
import { initPortalClient } from "~/models/portal/portal.server"
import { Blockchain } from "~/models/portal/sdk"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { authenticator } from "~/utils/auth.server"
import { seo_title_append } from "~/utils/meta"

export const meta: MetaFunction = () => {
  return {
    title: `Contact Sales ${seo_title_append}`,
  }
}

export const links = () => {
  return [...ContactSalesViewLinks()]
}

export type ContactSalesLoaderData = {
  blockchains: Blockchain[] | null
}

export const loader: LoaderFunction = async () => {
  const portal = initPortalClient()
  const blockchainResponse = await portal.blockchains({ active: true }).catch((e) => {
    console.log(e)
  })

  return json<ContactSalesLoaderData>(
    {
      blockchains: blockchainResponse
        ? (blockchainResponse.blockchains.filter(
            (chain) => chain !== null,
          ) as Blockchain[])
        : null,
    },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

type Result = "success" | "error"
export type ContactSalesActionData =
  | {
      result: Result
      row?: number
      error?: any
    }
  | {
      error: true
      data: any
      result: Result
    }

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  const formData = await request.formData()
  const firstName = formData.get("first-name")
  const lastName = formData.get("last-name")
  const email = formData.get("email")
  const company = formData.get("company")
  const protocolChains = formData.get("protocol-chains")
  const relays = formData.get("relays")
  const tellUsMore = formData.get("tell-us-more")

  try {
    const cms = initCmsClient()

    invariant(typeof firstName === "string", "first-name field must be a string")
    invariant(typeof lastName === "string", "last-name field must be a string")
    invariant(typeof email === "string", "email field must be a string")
    invariant(
      typeof protocolChains === "string",
      "protocol-chains field must be a string",
    )
    invariant(typeof relays === "string", "relays field must be a string")

    const response = await cms.createContactSalesFormsItem({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        company: typeof company === "string" ? company : undefined,
        chain_of_interest: protocolChains,
        daily_relay_needs: Number(relays),
        more_info: typeof tellUsMore === "string" ? tellUsMore : undefined,
      },
    })

    if (!response.create_contact_sales_forms_item?.id) {
      throw new Error("Unable to add new form to directus")
    }

    return redirect(user ? "/dashboard/apps" : "/")
  } catch (e) {
    return json<ContactSalesActionData>({
      result: "error",
      error: true,
      data: e,
    })
  }
}

export default function ContactSales() {
  const loaderData = useLoaderData() as ContactSalesLoaderData
  const actionData = useActionData() as ContactSalesActionData

  useEffect(() => {
    trackEvent(AmplitudeEvents.ContactSalesView)
  }, [])

  return (
    <ContactSalesView
      actionData={actionData ?? { result: "error", error: null }}
      loaderData={loaderData}
    />
  )
}

export const CatchBoundary = () => {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <div className="error-container">
        <h1>Contact Sales Catch Error</h1>
        <p>{caught.statusText}</p>
      </div>
    )
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h1>Contact Sales Error</h1>
      <p>{error.message}</p>
    </div>
  )
}
