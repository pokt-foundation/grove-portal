import { useSessionStorage } from "@mantine/hooks"
import { Alert } from "@pokt-foundation/pocket-blocks"
import React, { useEffect, useState } from "react"
import { LuAlertCircle } from "react-icons/lu"
import useCommonStyles from "~/styles/commonStyles"
import { getRequiredClientEnvVar } from "~/utils/environment"

const ANNOUNCEMENT_ALERT_TITLE = getRequiredClientEnvVar("ANNOUNCEMENT_ALERT_TITLE")
const ANNOUNCEMENT_ALERT_BODY = getRequiredClientEnvVar("ANNOUNCEMENT_ALERT_BODY")

export const AnnouncementAlert = () => {
  const { classes: commonClasses } = useCommonStyles()
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true)

  const [hideAnnouncementAlert, setHideAnnouncementAlert] = useSessionStorage({
    key: "hide-announcement-alert",
    defaultValue: "false",
  })

  useEffect(() => {
    setIsInitialRender(false)
  }, [])

  return !isInitialRender && hideAnnouncementAlert === "false" ? (
    <Alert
      withCloseButton
      className={commonClasses.mainBackgroundColor}
      color="orange"
      icon={<LuAlertCircle size={16} />}
      title={ANNOUNCEMENT_ALERT_TITLE}
      variant="outline"
      onClose={() => {
        setHideAnnouncementAlert("true")
      }}
    >
      {ANNOUNCEMENT_ALERT_BODY}
    </Alert>
  ) : null
}

export default AnnouncementAlert
