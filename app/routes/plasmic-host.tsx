import {
  PlasmicCanvasHost,
} from "@plasmicapp/loader-react"
import { Button } from "@pokt-foundation/pocket-blocks";
import { PLASMIC } from "~/plasmic-init"

export default function PlasmicPOC() {
  return <PlasmicCanvasHost />
}

PLASMIC.registerComponent(Button, {
  name: "PersonalButton",
  props: {
    children: "slot",
    color: "string",
  }
})