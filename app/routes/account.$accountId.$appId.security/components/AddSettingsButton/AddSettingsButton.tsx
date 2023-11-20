import { Button } from "@mantine/core"
import React, { ButtonHTMLAttributes, forwardRef } from "react"
import { LuPlus } from "react-icons/lu/index.js"
import useCommonStyles from "~/styles/commonStyles"

const AddSettingsButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  const { classes: commonClasses } = useCommonStyles()
  return (
    <Button
      ref={ref}
      className={commonClasses.grayOutlinedButton}
      color="gray"
      rightIcon={<LuPlus size={18} />}
      variant="outline"
      {...props}
    >
      Add
    </Button>
  )
})

export default AddSettingsButton
