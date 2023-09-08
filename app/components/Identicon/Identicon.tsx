import { Avatar, MantineTheme } from "@pokt-foundation/pocket-blocks"
import React, { useMemo } from "react"
import { minidenticon } from "~/utils/identicons"

type IdenticonProps = {
  username: string
  alt?: string
  saturation?: number
  lightness?: number
}

export const Identicon = ({ username, saturation, lightness, alt }: IdenticonProps) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness],
  )
  return (
    <Avatar
      alt={alt}
      radius="xl"
      size="md"
      src={svgURI}
      sx={(theme: MantineTheme) => ({
        cursor: "pointer",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.navy[0],
        border: `1px solid ${
          theme.colorScheme === "dark" ? theme.colors.gray[8] : theme.colors.gray[3]
        }`,
        padding: 3,
      })}
      variant="outline"
    />
  )
}

export default Identicon
