import { ActionFunction, json, MetaFunction } from "@remix-run/node"
import { useActionData } from "@remix-run/react"
import { getRequiredClientEnvVar } from "~/utils/environment"
import ContactSalesView, {
  links as ContactSalesViewLinks,
} from "~/views/dashboard/apps/contact-sales/contactSalesView"

export const meta: MetaFunction = () => {
  return {
    title: "Contact Sales",
  }
}

export const links = () => {
  return [...ContactSalesViewLinks()]
}

type Result = "success" | "error"

export type ContactSalesActionData =
  | {
      result: Result
      row?: number
      error?: any
    }
  | {
      error: boolean
      data: any
      result: Result
    }

export const action: ActionFunction = async ({ request }) => {
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

    const responseData: ContactSalesActionData = await response.json()
    return json<ContactSalesActionData>(responseData)
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
  return <ContactSalesView {...actionData} />
}
