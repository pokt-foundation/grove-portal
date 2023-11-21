import { MantineNumberSize, Avatar, MantineTheme } from "@mantine/core"
import React, { useMemo } from "react"
import { minidenticon, picasso } from "~/utils/identicons"

type IdenticonProps = {
  seed: string
  type: "user" | "account"
  alt?: string
  size?: MantineNumberSize
  avatar?: boolean
}

export const Identicon = ({ seed, type, alt, size = "md", avatar }: IdenticonProps) => {
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
      radius={avatar ? "xl" : "sm"}
      size={size}
      src={svgURI}
      sx={(theme: MantineTheme) => ({
        cursor: "pointer",
        ...(avatar && {
          border: `1px solid ${
            theme.colorScheme === "dark" ? theme.colors.gray[8] : theme.colors.gray[3]
          }`,
          padding: 3,
        }),
      })}
      variant="outline"
    />
  )
}

export default Identicon
