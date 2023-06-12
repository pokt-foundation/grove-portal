import userEvent from "@testing-library/user-event"
import { Auth0Profile } from "remix-auth-auth0"
import { expect } from "vitest"
import ProfileView, { SUCCESSFUL_CHANGE_PASSWORD_MSG } from "./view"
import { render, screen, waitFor } from "test/helpers"

const profile: Auth0Profile = {
  id: "auth0|230rf40fgj0jf30e",
  displayName: "profile test",
  emails: [
    {
      value: "user@pokt.network",
    },
  ],
  name: {
    familyName: "pokt",
    givenName: "user",
    middleName: "network",
  },
  photos: [{ value: "" }],
  _json: {
    address: {
      country: "",
    },
    birthdate: "",
    email: "user@pokt.network",
    email_verified: true,
    family_name: "pokt",
    gender: "",
    given_name: "user",
    locale: "en",
    middle_name: "network",
    name: "user",
    nickname: "user",
    phone_number: "",
    phone_number_verified: false,
    picture: "",
    preferred_username: "user",
    profile: "",
    sub: "",
    updated_at: "",
    website: "",
    zoneinfo: "",
  },
  provider: "",
}

describe("<ProfileView />", () => {
  it("renders", () => {
    render(<ProfileView profile={profile} />)

    expect(screen.getByRole("heading", { name: /User Profile/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /Account Management/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Change password/i })).toBeInTheDocument()
  })

  it("sends email when change password button is clicked and opens modal", async () => {
    const user = userEvent.setup()
    render(<ProfileView actionData={SUCCESSFUL_CHANGE_PASSWORD_MSG} profile={profile} />)

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
