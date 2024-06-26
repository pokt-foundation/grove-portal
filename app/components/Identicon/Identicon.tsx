import { Avatar, AvatarProps } from "@mantine/core"
import React, { useMemo } from "react"
import { minidenticon, picasso } from "~/utils/identicons"

type IdenticonProps = {
  seed: string
  type: "user" | "account"
  alt?: string
  size?: AvatarProps["size"]
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
      radius={avatar ? "xl" : 2}
      size={size}
      src={svgURI}
      style={{
        cursor: "pointer",
        ...(avatar && {
          border: "1px solid var(--app-shell-border-color)",
          padding: 3,
        }),
      }}
      variant="outline"
    />
  )
}

export default Identicon
