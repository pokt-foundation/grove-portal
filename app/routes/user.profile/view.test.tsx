import userEvent from "@testing-library/user-event"
import { expect } from "vitest"
import ProfileView from "./view"
import { render, screen, waitFor } from "test/helpers"
import { profileMockData } from "~/models/portal/portal.data"

describe.skip("<ProfileView />", () => {
  it("renders", () => {
    render(<ProfileView user={profileMockData} />)

    expect(screen.getByRole("heading", { name: /User Profile/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /Account Management/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Change password/i })).toBeInTheDocument()
  })

  it("sends email when change password button is clicked and opens modal", async () => {
    const user = userEvent.setup()
    render(<ProfileView user={profileMockData} />)

    const changePasswordButton = screen.getByRole("button", { name: /Change password/i })
    expect(changePasswordButton).toBeInTheDocument()
    user.click(changePasswordButton)

    await waitFor(() => {
      expect(
        screen.getByText("We've just sent you an email to reset your password."),
      ).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Check your email/i }),
      ).toBeInTheDocument()
    })

    const doneButton = screen.getByRole("button", { name: /Done/i })
    expect(doneButton).toBeInTheDocument()
    user.click(doneButton)

    await waitFor(() => {
      expect(
        screen.queryByText("We've just sent you an email to reset your password."),
      ).not.toBeInTheDocument()
    })

    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: /Check your email/i }),
      ).not.toBeInTheDocument()
    })
  })
})
