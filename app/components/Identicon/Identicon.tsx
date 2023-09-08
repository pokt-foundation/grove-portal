import { useMemo } from "react"
import { minidenticon } from "~/utils/identicons"

type IdenticonProps = {
  username: string
  saturation?: number
  lightness?: number
}

export const Identicon = ({ username, saturation, lightness }: IdenticonProps) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness],
  )
  return <img alt={username} src={svgURI} />
}

export default Identicon
