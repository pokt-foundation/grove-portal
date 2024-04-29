import { ActionIcon, Menu } from "@mantine/core"
import React from "react"
import { LuMoreHorizontal } from "react-icons/lu"

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
      >
        <LuMoreHorizontal />
      </ActionIcon>
    </Menu.Target>
  )
}

export default ContextMenuTarget
