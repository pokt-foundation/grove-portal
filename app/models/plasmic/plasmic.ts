import { initPlasmicLoader } from "@plasmicapp/loader-react"
import { getRequiredServerEnvVar } from "~/utils/environment"

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: getRequiredServerEnvVar("PLASMIC_ID"),
      token: getRequiredServerEnvVar("PLASMIC_TOKEN"),
    },
  ],

  preview: true,
})
