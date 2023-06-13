import { LoaderFunction, MetaFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import Stripe from "stripe"
import invariant from "tiny-invariant"
import SettingsView, { links as SettingsViewLinks } from "./view"
import { getInvoices } from "~/models/stripe/stripe.server"
import { getPoktId, requireUser } from "~/utils/session.server"

export type AppSettingsLoaderData = {
  invoices: Stripe.Invoice[] | undefined
  error?: unknown
}

export const meta: MetaFunction = () => {
  return {
    title: "Application Settings - POKT Portal - Pocket Network",
  }
}

export const links = () => {
  return [...SettingsViewLinks()]
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  invariant(user.profile.id && user.profile.emails, "user not found")
  const userId = getPoktId(user.profile.id)

  try {
    const invoices = await getInvoices(user.profile.emails[0].value, userId)
    return json<AppSettingsLoaderData>({ invoices: invoices })
  } catch (e) {
    console.error(e)
    return json<AppSettingsLoaderData>({
      error: e,
      invoices: undefined,
    })
  }
}

export function AppSettings() {
  const loaderData = useLoaderData() as AppSettingsLoaderData
  return <SettingsView data={loaderData} />
}

export default AppSettings
