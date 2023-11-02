import { Stack, Text } from "@pokt-foundation/pocket-blocks"
import Lottie from "lottie-react"

import groveTreeAnimation from "./grove-tree.json"

type PortalLoaderProps = { message?: string; size?: "md" | "lg" }

const LOADER_SIZE = {
  md: 180,
  lg: 380,
}

const PortalLoader = ({ message, size = "md" }: PortalLoaderProps) => {
  return (
    <Stack align="center" justify="center">
      <Lottie
        animationData={groveTreeAnimation}
        // eslint-disable-next-line jsx-a11y/aria-props
        aria-aria-labelledby="Grove loading animation"
        style={{ height: LOADER_SIZE[size] }}
      />
      {message && <Text> {message} </Text>}
    </Stack>
  )
}

export default PortalLoader
