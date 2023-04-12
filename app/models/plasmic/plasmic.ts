import { initPlasmicLoader } from "@plasmicapp/loader-react"
export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "7AMMaZfSfMAJorUAF1dxTi", // ID of a project you are using
      token:
        "2CqoU4qWlMAcxr9XwGzY5gvw4P5SlwIwgh8GWQ7WpyjD8xUnorL38im2HOFci8VoKjsOic73tSqFo5NHGIw", // API token for that project
    },
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
})
