import { expect } from "vitest"
import ContactSalesView from "./contactSalesView"
import { render, screen } from "test/helpers"
import schema from "~/locales/en"
import { blockchains } from "~/models/portal/portal.data"

describe("<ContactSalesView />", () => {
  it("renders", () => {
    render(
      <ContactSalesView
        actionData={{ result: "success" }}
        loaderData={{ blockchains: blockchains }}
      />,
    )

    expect(
      screen.getByRole("heading", {
        name: schema.ContactSalesView.title,
      }),
    ).toBeInTheDocument()
  })

  it("renders success modal when submission is successful", () => {
    render(
      <ContactSalesView
        actionData={{ result: "success" }}
        loaderData={{ blockchains: blockchains }}
      />,
    )

    expect(screen.getByRole("heading", { name: /Form Submitted/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Done/i })).toBeInTheDocument()
  })

  it("renders failure modal when submission fails", () => {
    render(
      <ContactSalesView
        actionData={{
          error: {
            error: true,
            data: "Something went wrong!",
          },
          result: "error",
        }}
        loaderData={{ blockchains: blockchains }}
      />,
    )

    expect(
      screen.getByRole("heading", { name: /Form Submission Failed/i }),
    ).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /Done/i })).toBeInTheDocument()
  })
})
