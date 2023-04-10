import { ActionFunction, json, MetaFunction, redirect } from "@remix-run/node"
import { useActionData, useCatch } from "@remix-run/react"
import { useEffect } from "react"
import styles from "~/styles/contact-sales.css"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { authenticator } from "~/utils/auth.server"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { seo_title_append } from "~/utils/meta"
import ContactSalesView, {
  links as ContactSalesViewLinks,
} from "~/views/dashboard/apps/contact-sales/contactSalesView"

export const meta: MetaFunction = () => {
  return {
    title: `Contact Sales ${seo_title_append}`,
  }
}

export const links = () => {
  return [...ContactSalesViewLinks(), { rel: "stylesheet", href: styles }]
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
    const response = await fetch(
      getRequiredClientEnvVar("GOOGLE_SHEETS_CONTACT_SALES_API_URL"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          company,
          chain_of_interest: protocolChains,
          relay_needs: relays,
          more_info: tellUsMore,
        }),
      },
    )

    await response.json()
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
  const actionData = useActionData()

  useEffect(() => {
    trackEvent(AmplitudeEvents.ContactSalesView)
  }, [])

  return <ContactSalesView {...actionData} />
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
