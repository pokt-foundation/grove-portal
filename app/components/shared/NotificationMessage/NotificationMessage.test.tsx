import { expect } from "vitest"
import NotificationMessage, { NotificationMessageType } from "./NotificationMessage"
import { render, screen } from "test/helpers"
import fs from "fs"
import path from "path"

const mockedNotificationMessage: NotificationMessageType = {
  type: "success",
  isActive: true,
  userEmail: "ricardo.souza@pokt.network",
  title: "Invite sent",
  description:
    "We have sent an invitation to ricardo.souza@pokt.network. You can review the invite status below.",
}

describe("<NotificationMessage />", () => {
  it("renders with a notification title and description", () => {
    render(
      <NotificationMessage
        notificationMessage={mockedNotificationMessage}
        setNotificationMessage={() => null}
      />,
    )
    expect(screen.getByText(mockedNotificationMessage.title)).toBeInTheDocument()
    expect(screen.getByText(mockedNotificationMessage.description)).toBeInTheDocument()
  })
  it("won't render title if the prop isActive is false", () => {
    const cssFile = fs.readFileSync(path.resolve(__dirname, "./styles.css"), "utf8")

    const { container, getByText, debug } = render(
      <NotificationMessage
        notificationMessage={{ ...mockedNotificationMessage, isActive: false }}
        setNotificationMessage={() => null}
      />,
    )

    const style = document.createElement("style")
    style.innerHTML = cssFile
    container.append(style)

    const itemNode = getByText(mockedNotificationMessage.title)
    debug()
    expect(itemNode).not.toBeVisible()
  })
})
