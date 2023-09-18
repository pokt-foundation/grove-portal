import { Avatar, MantineTheme } from "@pokt-foundation/pocket-blocks"
import React, { useMemo } from "react"
import { minidenticon, picasso } from "~/utils/identicons"

type IdenticonProps = {
  seed: string
  type: "user" | "account"
  alt?: string
}

export const Identicon = ({ seed, type, alt }: IdenticonProps) => {
  const svgURI = useMemo(() => {
    let svg
    if (type === "user") {
      svg = minidenticon(seed)
    } else {
      svg = picasso(seed)
    }
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg)
  }, [seed, type])
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
