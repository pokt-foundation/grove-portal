import { Box, Stack, Text } from "@mantine/core"

import { useLottie } from "lottie-react"
import groveTreeAnimation from "./grove-tree.json"

type PortalLoaderProps = { message?: string; size?: "md" | "lg" }

const LOADER_SIZE = {
  md: 180,
  lg: 380,
}

const options = {
  animationData: groveTreeAnimation,
  loop: true,
  autoplay: true,
}

const PortalLoader = ({ message, size = "md" }: PortalLoaderProps) => {
  const { View } = useLottie(options, { height: LOADER_SIZE[size] })

  return (
    <Stack align="center" justify="center">
      <Box aria-labelledby="Grove loading animation">{View}</Box>
      {message && <Text> {message} </Text>}
    </Stack>
  )
}

export default PortalLoader
