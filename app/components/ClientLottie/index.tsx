// app/components/ClientLottie/index.tsx
import { useEffect, useState } from "react"
import LottieProps, { useLottie as useLottieOriginal } from "lottie-react"

// The client-only Lottie component
export default function ClientLottie(props: React.ComponentProps<typeof LottieProps>) {
  const [Lottie, setLottie] = useState<typeof LottieProps | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    import("lottie-react").then((module) => {
      setLottie(() => module.default)
    })
  }, [])

  if (!isMounted || !Lottie) {
    return null
  }

  return <Lottie {...props} />
}

// Client-only useLottie hook
export function useLottie(options: Parameters<typeof useLottieOriginal>[0]) {
  const [hook, setHook] = useState<ReturnType<typeof useLottieOriginal> | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    import("lottie-react").then((module) => {
      setHook(module.useLottie(options))
    })
  }, [options])

  // Return a placeholder until the hook is available
  if (!isMounted || !hook) {
    return {
      View: () => null,
      play: () => {},
      stop: () => {},
      pause: () => {},
      setSpeed: () => {},
      goToAndPlay: () => {},
      goToAndStop: () => {},
      setDirection: () => {},
      playSegments: () => {},
      setSubframe: () => {},
      getDuration: () => 0,
      destroy: () => {},
    }
  }

  return hook
}
