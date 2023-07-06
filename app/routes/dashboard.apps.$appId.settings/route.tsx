import { LoaderFunction, MetaFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import dayjs from "dayjs"
import Stripe from "stripe"
import invariant from "tiny-invariant"
import SettingsView, { links as SettingsViewLinks } from "./view"
import { initPortalClient } from "~/models/portal/portal.server"
import { RelayMetric, getRelays } from "~/models/relaymeter/relaymeter.server"
import { getInvoices, stripe } from "~/models/stripe/stripe.server"
import { getErrorMessage } from "~/utils/catchError"
import { getPoktId, requireUser } from "~/utils/session.server"

export type AppSettingsLoaderData =
  | {
      invoices: Stripe.Invoice[]
      relaysInvoices: RelayMetric[]
      usageRecords: Array<Stripe.ApiList<Stripe.UsageRecordSummary>>
      error: false
    }
  | {
      error: true
      message: string
    }

export const meta: MetaFunction = () => {
  return {
    title: "Application Settings - POKT Portal - Pocket Network",
  }
}

export const links = () => {
  return [...SettingsViewLinks()]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.appId, "app id not found")
  const user = await requireUser(request)
  invariant(user.profile.id && user.profile.emails, "user not found")
  const userId = getPoktId(user.profile.id)
  const portal = initPortalClient({ token: user.accessToken })

  try {
    const { endpoint } = await portal.endpoint({
      endpointID: params.appId,
    })

    const allInvoices = await getInvoices(user.profile.emails[0].value, userId)
    if (!allInvoices || allInvoices.length === 0) {
      throw new Error("No invoices found for this endpoint")
    }

    const invoices = allInvoices.filter(
      (i) => i.lines.data[0].metadata.endpoint_id === endpoint.id,
    )

    const relaysInvoices = await Promise.all(
      invoices.map(async (invoice) => {
        const invoicePeriodStart = dayjs.unix(Number(invoice.period_start)).toISOString()
        const invoicePeriodEnd = dayjs.unix(Number(invoice.period_start)).toISOString()

        return getRelays("endpoints", invoicePeriodStart, invoicePeriodEnd, endpoint.id)
      }),
    )

    const subscriptionItems = invoices.map((i) => i.lines.data[0].subscription_item)

    let usageRecords: Array<Stripe.ApiList<Stripe.UsageRecordSummary>> = []
    const promises = subscriptionItems.map(async (sub) => {
      const ur = await stripe.subscriptionItems.listUsageRecordSummaries(sub ?? "")
      usageRecords = [...usageRecords, ur]
    })
    await Promise.all(promises)

    return json<AppSettingsLoaderData>({
      invoices,
      relaysInvoices,
      usageRecords,
      error: false,
    })
  } catch (e) {
    console.error(e)
    return json<AppSettingsLoaderData>({
      error: true,
      message: getErrorMessage(e),
    })
  }
}

export function AppSettings() {
  const loaderData = useLoaderData() as AppSettingsLoaderData
  return <SettingsView data={loaderData} />
}

export default AppSettings
