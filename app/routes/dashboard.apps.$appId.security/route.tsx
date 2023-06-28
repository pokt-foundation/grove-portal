import { MetaFunction } from "@remix-run/node"
import { ActionFunction, json, redirect } from "@remix-run/node"
import { useOutletContext, useParams } from "@remix-run/react"
import { useEffect } from "react"
import { AppIdOutletContext } from "../dashboard.apps.$appId/route"
import SecurityView, { links as SecurityViewLinks } from "./view"
import { initPortalClient } from "~/models/portal/portal.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { requireUser } from "~/utils/session.server"

export const meta: MetaFunction = () => {
  return {
    title: "Application Security - POKT Portal - Pocket Network",
  }
}

export const links = () => {
  return [...SecurityViewLinks()]
}

const unifyContracts = (chains: string[], values: string[]) => {
  let together = {} as { [key: string]: string[] }

  let formatted = []
  if (chains.length > 0) {
    for (let i = 0; i < chains.length; i += 1) {
      if (together[chains[i]] === undefined) {
        together[chains[i]] = []
      }
      together[chains[i]].push(values[i])
    }
  }

  if (Object.keys(together).length !== 0) {
    for (const [key, value] of Object.entries(together)) {
      formatted.push({
        blockchainID: key,
        contracts: value,
      })
    }
  }
  return formatted
}

const unifyMethods = (chains: string[], values: string[]) => {
  let together = {} as { [key: string]: string[] }

  let formatted = []
  if (chains.length > 0) {
    for (let i = 0; i < chains.length; i += 1) {
      if (together[chains[i]] === undefined) {
        together[chains[i]] = []
      }
      together[chains[i]].push(values[i])
    }
  }

  if (Object.keys(together).length !== 0) {
    for (const [key, value] of Object.entries(together)) {
      formatted.push({
        blockchainID: key,
        methods: value,
      })
    }
  }
  return formatted
}

export interface AppSecurityActionResponse {
  error: boolean
  data: {
    appID: string
    secretKeyRequired: boolean
    whitelistOrigins: string[]
    whitelistUserAgents: string[]
    whitelistBlockchains: string[]
    whitelistContracts: { blockchainID: string; contracts: string[] }[]
    whitelistMethods: { blockchainID: string; methods: string[] }[]
    whitelistContractsChains: string[]
    whitelistContractsValues: string[]
    whitelistMethodsChains: string[]
    whitelistMethodsValues: string[]
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  let data: AppSecurityActionResponse["data"] = {
    appID: "",
    secretKeyRequired: false,
    whitelistOrigins: [],
    whitelistUserAgents: [],
    whitelistBlockchains: [],
    whitelistContracts: [],
    whitelistContractsChains: [],
    whitelistContractsValues: [],
    whitelistMethodsChains: [],
    whitelistMethodsValues: [],
    whitelistMethods: [],
  }

  if (formData.has("appID")) {
    data.appID = formData.get("appID") as string
  }
  if (formData.has("secretKeyRequired")) {
    data.secretKeyRequired = formData.get("secretKeyRequired") === "on"
  }
  if (formData.has("whitelistUserAgents")) {
    data.whitelistUserAgents = formData.getAll("whitelistUserAgents") as string[]
  }
  if (formData.has("whitelistBlockchains")) {
    data.whitelistBlockchains = formData.getAll("whitelistBlockchains") as string[]
  }
  if (formData.has("whitelistOrigins")) {
    data.whitelistOrigins = formData.getAll("whitelistOrigins") as string[]
  }

  if (
    formData.has("whitelistContractsChains") &&
    formData.has("whitelistContractsValues")
  ) {
    const chains = formData.getAll("whitelistContractsChains") as string[]
    const values = formData.getAll("whitelistContractsValues") as string[]
    data.whitelistContracts = unifyContracts(chains, values)
  }

  if (formData.has("whitelistMethodsChains") && formData.has("whitelistMethodsValues")) {
    const chains = formData.getAll("whitelistMethodsChains") as string[]
    const values = formData.getAll("whitelistMethodsValues") as string[]
    data.whitelistMethods = unifyMethods(chains, values)
  }

  try {
    const user = await requireUser(request)
    const portal = initPortalClient(user.accessToken)
    const res = await portal.updateEndpoint({
      input: {
        id: data.appID,
        gatewaySettings: {
          secretKeyRequired: data.secretKeyRequired,
          whitelistBlockchains: data.whitelistBlockchains,
          whitelistContracts: data.whitelistContracts,
          whitelistMethods: data.whitelistMethods,
          whitelistOrigins: data.whitelistOrigins,
          whitelistUserAgents: data.whitelistUserAgents,
        },
      },
    })

    return json({ error: false, res })
  } catch (e) {
    console.log(e)
    return json({ error: true, res: null })
  }
}

export const AppSecurity = () => {
  const params = useParams()

  useEffect(() => {
    trackEvent(AmplitudeEvents.SecurityDetailsView)
  }, [])

  const { blockchains, endpoint } = useOutletContext<AppIdOutletContext>()

  return (
    <SecurityView appId={params.appId} blockchains={blockchains} endpoint={endpoint} />
  )
}

export default AppSecurity
