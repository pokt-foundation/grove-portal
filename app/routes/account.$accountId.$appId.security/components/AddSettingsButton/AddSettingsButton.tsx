import { Button } from "@mantine/core"
import React, { ButtonHTMLAttributes, forwardRef } from "react"
import { LuPlus } from "lucide-react"

const AddSettingsButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  return (
    <Button
      ref={ref}
      color="gray"
      rightSection={<LuPlus size={18} />}
      variant="outline"
      {...props}
    >
      Add
    </Button>
  )
})

export default AddSettingsButton
