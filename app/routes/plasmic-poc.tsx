import {
  PlasmicRootProvider,
  PlasmicComponent,
} from "@plasmicapp/loader-react"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { PLASMIC } from "../plasmic-init"

export const loader = async () => {
  const plasmicData = await PLASMIC.fetchComponentData("Homepage")
  return json(plasmicData)
}

export default function PlasmicPOC() {
  const plasmicData = useLoaderData()
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
      <PlasmicComponent component="Homepage" />
    </PlasmicRootProvider>
  )
}