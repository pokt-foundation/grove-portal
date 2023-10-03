import { showNotification } from "@mantine/notifications"
import React, { useEffect } from "react"
import { LuCheck, LuX } from "react-icons/lu"
import { DataStruct } from "~/types/global"

type ActionNotificationData = Pick<DataStruct<DataStruct<any>>, "message" | "error">

const useActionNotification = (data: ActionNotificationData) => {
  useEffect(() => {
    if (!data) return

    if (data.message) {
      showNotification({
        icon: data.error ? <LuX size={18} /> : <LuCheck size={18} />,
        color: data.error ? "red" : "green",
        message: data.message,
      })
    }
  }, [data])
}

export default useActionNotification
