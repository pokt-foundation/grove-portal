import { initPlasmicLoader } from "@plasmicapp/loader-react"
import { getRequiredClientEnvVar } from "~/utils/environment"

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: getRequiredClientEnvVar("PLASMIC_ID"),
      token: getRequiredClientEnvVar("PLASMIC_TOKEN"),
    },
  ],

  preview: true,
})
