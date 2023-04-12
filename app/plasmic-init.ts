import { initPlasmicLoader } from "@plasmicapp/loader-react";
import { Button } from "@pokt-foundation/pocket-blocks";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "7b3EUxmZQ79TPsQHhyAAmG",
      token: "AdMzWpsjyE9FzoBSMbfv6soueXiLTnMX7fhJdaZ5NyAuacLTqry1wgi6NeX2blKZV03CPRqNWiGTTkSlQ" 
    }
  ],
  preview: true,
})

PLASMIC.registerComponent(Button, {
  name: "PersonalButton",
  props: {
    children: "slot",
    color: "string",
  }
})