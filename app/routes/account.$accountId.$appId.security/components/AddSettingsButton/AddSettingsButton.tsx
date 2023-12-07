import { Button } from "@pokt-foundation/pocket-blocks"
import React, { ButtonHTMLAttributes, forwardRef } from "react"
import { LuPlus } from "react-icons/lu"
import useCommonStyles from "~/styles/commonStyles"

const AddSettingsButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  const { classes: commonClasses } = useCommonStyles()
  return (
    <Button
      ref={ref}
      className={commonClasses.grayOutline}
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
