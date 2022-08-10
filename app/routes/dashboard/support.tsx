import { useEffect } from "react"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

export const Support = () => {
  useEffect(() => {
    trackEvent(AmplitudeEvents.SupportView)
  }, [])

  return <h1>Support</h1>
}

export default Support
