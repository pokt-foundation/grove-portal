import { expect } from "vitest"
import { render, screen } from "test/helpers"
import NotificationMessage, { NotificationMessageType } from "./NotificationMessage"

describe("<NotificationMessage />", () => {
  it("renders with a notification title and description", () => {
    const mockedNotificationMessage: NotificationMessageType = {
      type: "success",
      isActive: true,
      userEmail: "ricardo.souza@pokt.network",
      title: "Invite sent",
      description:
        "We have sent an invitation to ricardo.souza@pokt.network. You can review the invite status below.",
    }

    render(
      <NotificationMessage
        notificationMessage={mockedNotificationMessage}
        setNotificationMessage={() => null}
      />,
    )

    expect(screen.getByText(mockedNotificationMessage.title)).toBeInTheDocument()
    expect(screen.getByText(mockedNotificationMessage.description)).toBeInTheDocument()
  })
})
