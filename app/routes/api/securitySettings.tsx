import { ActionFunction, json } from "@remix-run/node"
import { postAppSecurity } from "~/models/portal.server"

const unifyArrays = (chains: string[], values: string[], inputKey: string) => {
  let together = {} as { [key: string]: string[] }

  let formatted = [] as { blockchainID: string; contracts: string[] }[]
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
        [(inputKey = "contracts" || "methods")]: value,
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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  console.log(formData, "formdata")
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
    data.whitelistContracts = unifyArrays(chains, values, "contracts")
  }

  if (formData.has("whitelistMethodsChains") && formData.has("whitelistMethodsValues")) {
    const chains = formData.getAll("whitelistMethodsChains") as string[]
    const values = formData.getAll("whitelistMethodsValues") as string[]
    data.whitelistContracts = unifyArrays(chains, values, "methods")
  }
  const res = await postAppSecurity(data, request)

  return json<AppSecurityActionResponse>({
    error: res.error,
    data: data,
  })
}
