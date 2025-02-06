import { Button } from "@mantine/core"
import { Plus } from "lucide-react"
import React, { ButtonHTMLAttributes, forwardRef } from "react"

const AddSettingsButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  return (
    <Button
      ref={ref}
      color="gray"
      rightSection={<Plus size={18} />}
      variant="outline"
      {...props}
    >
      Add
    </Button>
  )
})

export default AddSettingsButton
