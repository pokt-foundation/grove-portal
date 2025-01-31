import { notifications } from "@mantine/notifications"
import React, { useEffect } from "react"
import { Check, X } from "lucide-react"
import { ActionDataStruct } from "~/types/global"

export type ActionNotificationData = Pick<ActionDataStruct<unknown>, "message" | "error">

const useActionNotification = (data: ActionNotificationData) => {
  useEffect(() => {
    if (!data) return

    if (data.message) {
      notifications.show({
        icon: data.error ? <X size={18} /> : <Check size={18} />,
        color: data.error ? "red" : "green",
        message: data.message,
      })
    }
  }, [data])
}

export default useActionNotification
