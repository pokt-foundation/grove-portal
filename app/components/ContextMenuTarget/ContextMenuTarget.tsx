import { ActionIcon, Menu } from "@mantine/core"
import React from "react"
import { LuMoreHorizontal } from "react-icons/lu/index.js"
import useCommonStyles from "~/styles/commonStyles"

const ContextMenuTarget = () => {
  const { classes: commonClasses } = useCommonStyles()

  return (
    <Menu.Target>
      <ActionIcon
        className={commonClasses.grayOutlinedButton}
        radius="xl"
        size={40}
        variant="outline"
      >
        <LuMoreHorizontal />
      </ActionIcon>
    </Menu.Target>
  )
}

export default ContextMenuTarget
