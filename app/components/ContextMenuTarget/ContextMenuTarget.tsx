import { ActionIcon, Menu } from "@mantine/core"
import React from "react"
import { LuEllipsis } from "lucide-react"

const ContextMenuTarget = ({
  variant = "outline",
}: {
  variant?: "outline" | "subtle"
}) => {
  return (
    <Menu.Target>
      <ActionIcon
        aria-label="Open context menu"
        color="gray"
        radius="xl"
        size={40}
        variant={variant}
        onClick={(e) => e.stopPropagation()}
      >
        <LuEllipsis />
      </ActionIcon>
    </Menu.Target>
  )
}

export default ContextMenuTarget
