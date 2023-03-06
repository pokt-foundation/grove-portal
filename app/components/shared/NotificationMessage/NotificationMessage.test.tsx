import fs from "fs"
import path from "path"
import { expect } from "vitest"
import NotificationMessage, { NotificationMessageType } from "./NotificationMessage"
import { render, screen } from "test/helpers"

const mockedNotificationMessage: NotificationMessageType = {
  type: "success",
  isActive: true,
  title: "Invite sent",
  description:
    "We have sent an invitation to ricardo.souza@pokt.network. You can review the invite status below.",
}

describe("<NotificationMessage />", () => {
  it("renders with a notification title and description", () => {
    render(
      <NotificationMessage
        notificationMessage={mockedNotificationMessage}
        setNotificationMessageIsActive={() => null}
      />,
    )
    expect(screen.getByText(mockedNotificationMessage.title)).toBeInTheDocument()
    expect(screen.getByText(mockedNotificationMessage.description)).toBeInTheDocument()
  })
  it("won't render title if the prop isActive is false", () => {
    const cssFile = fs.readFileSync(path.resolve(__dirname, "./styles.css"), "utf8")

    const { container } = render(
      <NotificationMessage
        notificationMessage={{ ...mockedNotificationMessage, isActive: false }}
        setNotificationMessageIsActive={() => null}
      />,
    )

    const style = document.createElement("style")
    style.innerHTML = cssFile
    container.append(style)

    const itemNode = screen.getByText(mockedNotificationMessage.title)
    expect(itemNode).not.toBeVisible()
  })
})
