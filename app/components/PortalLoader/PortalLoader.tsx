import { Box, Stack, Text } from "@mantine/core"
import { ClientOnly } from 'remix-utils/client-only';
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
  return (
    <ClientOnly fallback={
      <Stack align="center" justify="center">
        <Box aria-labelledby="Grove loading animation">Loading...</Box>
        {message && <Text> {message} </Text>}
      </Stack>
    }>
      {() => <ClientSideLottie message={message} size={size} loaderAnimation={loaderAnimation} />}
    </ClientOnly>
  );
};

// This component only renders on the client side
function ClientSideLottie({ message, size = "md", loaderAnimation }: PortalLoaderProps) {
  // Only import and use Lottie on the client
  const Lottie = require('lottie-react');
  const { useLottie } = require('lottie-react');
  
  const { View } = useLottie(
    {
      loop: true,
      autoplay: true,
      animationData: loaderAnimation,
    },
    { height: LOADER_SIZE[size] },
  );
  
  return (
    <Stack align="center" justify="center">
      <Box aria-labelledby="Grove loading animation">{View}</Box>
      {message && <Text> {message} </Text>}
    </Stack>
  );
}

export default PortalLoader
