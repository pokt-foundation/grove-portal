import { ActionFunction, json } from "@remix-run/node"
import { postAppSecurity } from "~/models/portal.server"

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
    whitelistMethods: [],
  }

  if (formData.has("appID")) {
    data.appID = formData.get("appID") as string
  }
  if (formData.has("secretKeyRequired")) {
    data.secretKeyRequired = formData.get("secretKeyRequired") === "on"
  } /*
  if (formData.has("whitelistUserAgents")) {
    data.whitelistUserAgents = formData.get("whitelistUserAgents")
  }
  if (formData.has("whitelistBlockchains")) {
    data.whitelistBlockchains = formData.get("whitelistBlockchains") as string[]
  }
  if (formData.has("whitelistOrigins")) {
    data.whitelistOrigins = formData.get("whitelistOrigins") as string[]
  }
  if (formData.has("whitelistContracts")) {
    data.whitelistContracts = formData.get("whitelistContracts") as {
      blockchainID: string
      contracts: string[]
    }[]
  }
  if (formData.has("whitelistMethods")) {
    data.whitelistMethods = formData.get("whitelistMethods") as {
      blockchainID: string
      methods: string[]
    }[]
  }*/
  const res = await postAppSecurity(data, request)

  return json<AppSecurityActionResponse>({
    error: res.error,
    data: data,
  })
}
