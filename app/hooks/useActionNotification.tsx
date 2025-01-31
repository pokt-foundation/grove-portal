import { notifications } from "@mantine/notifications"
import React, { useEffect } from "react"
import { LuCheck, LuX } from "lucide-react"
import { ActionDataStruct } from "~/types/global"

export type ActionNotificationData = Pick<ActionDataStruct<unknown>, "message" | "error">

const useActionNotification = (data: ActionNotificationData) => {
  useEffect(() => {
    if (!data) return

    if (data.message) {
      notifications.show({
        icon: data.error ? <LuX size={18} /> : <LuCheck size={18} />,
        color: data.error ? "red" : "green",
        message: data.message,
      })
    }
  }, [data])
}

export default useActionNotification
