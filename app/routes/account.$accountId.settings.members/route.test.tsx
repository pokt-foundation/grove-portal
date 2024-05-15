import { json } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { TeamActionData } from "./action"
import AccountMembers, { TeamLoaderData } from "./route"
import { createRemixStub, render, waitFor, screen, fireEvent } from "test/helpers"
import { accountMockData, profileMockData } from "~/models/portal/portal.data"
import { RoleName } from "~/models/portal/sdk"
import RootProviders from "~/root/components/RootProviders"
import { ActionDataStruct } from "~/types/global"

function SettingsOutLetContext() {
  return (
    <RootProviders>
      <Outlet
        context={{
          userRole: RoleName.Admin,
          account: accountMockData,
          user: profileMockData,
        }}
      />
    </RootProviders>
  )
}

describe("/account/$accountId/settings/members", () => {
  it("renders all members in account", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: SettingsOutLetContext,
        children: [
          {
            path: "/",
            Component: AccountMembers,
            loader: () => {
              return json<TeamLoaderData>({
                profile: profileMockData,
                accessToken: "accesstoken",
              })
            },
          },
        ],
      },
    ])
    render(<RemixStub />)

    await waitFor(() => {
      expect(screen.getByText("rabee+3@grove.city")).toBeInTheDocument()
    })
    expect(screen.getByText("rabee+1@grove.city")).toBeInTheDocument()
    expect(screen.getByText("rabee@grove.city")).toBeInTheDocument()
  })
  it("handle new member invite", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: SettingsOutLetContext,
        children: [
          {
            path: "/",
            Component: AccountMembers,
            loader: () => {
              return json<TeamLoaderData>({
                profile: profileMockData,
                accessToken: "accesstoken",
              })
            },
            action: () => {
              return json<ActionDataStruct<TeamActionData>>({
                data: null,
                error: true,
                message: "mocking error",
              })
            },
          },
        ],
      },
    ])
    render(<RemixStub />)

    await waitFor(() => {
      const inviteButton = screen.getByText(/invite new member/i)
      // ensure member page loaded
      expect(inviteButton).toBeInTheDocument()

      // open modal
      fireEvent.click(inviteButton)
    })

    // expect modal to have opened
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText(/invite member/i)).toBeInTheDocument()
    const inviteForm: HTMLFormElement = screen.getByRole("form", {
      name: "inviteMemberForm",
    })
    const emailField: HTMLInputElement = screen.getByRole("textbox", {
      name: /email address/i,
    })
    const roleField: HTMLInputElement = screen.getByRole("textbox", { name: /role/i })
    expect(inviteForm).toBeInTheDocument()
    expect(emailField).toBeInTheDocument()
    expect(roleField).toBeInTheDocument()

    // fill out form in modal
    fireEvent.change(emailField, { target: { value: "testing@test.com" } })
    expect(emailField).toHaveValue("testing@test.com")
    fireEvent.change(roleField, { target: { value: "MEMBER" } })
    expect(roleField).toHaveValue("MEMBER")

    // // submit form
    // const submitButton = screen.getByRole("button", { name: /invite/i })
    // fireEvent.click(submitButton)

    // // success
    // expect(screen.getByText(/mocking error/i)).toBeInTheDocument()
  })
})
