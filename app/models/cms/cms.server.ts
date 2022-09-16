import { Directus } from "@directus/sdk"
import { Collections } from "./types"
import { getRequiredServerEnvVar } from "~/utils/environment"

const directus = new Directus<Collections>(getRequiredServerEnvVar("CMS_API_URL"))

export async function initCmsClient() {
  if (await directus.auth.token) return directus

  await directus.auth.static(getRequiredServerEnvVar("CMS_API_TOKEN"))
  return directus
}
