import { Box, Stack, Text } from "@mantine/core"

import { useLottie } from "lottie-react"
import groveTreeAnimation from "./grove-tree.json"

type PortalLoaderProps = {
  message?: string
  size?: "md" | "lg"
  loaderAnimation?: Record<string, unknown>
}

const LOADER_SIZE = {
  md: 180,
  lg: 380,
}

const PortalLoader = ({
  message,
  size = "md",
  loaderAnimation = groveTreeAnimation,
}: PortalLoaderProps) => {
  const { View } = useLottie(
    {
      loop: true,
      autoplay: true,
      animationData: loaderAnimation,
    },
    { height: LOADER_SIZE[size] },
  )
  return (
    <Stack align="center" justify="center">
      <Box aria-labelledby="Grove loading animation">{View}</Box>
      {message && <Text> {message} </Text>}
    </Stack>
  )
}

export default PortalLoader
