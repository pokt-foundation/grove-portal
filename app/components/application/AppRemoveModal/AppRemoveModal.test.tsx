import userEvent from "@testing-library/user-event"
import { expect } from "vitest"
import AppRemoveModal from "./AppRemoveModal"
import { render, screen, waitFor } from "test/helpers"

const appId = "605238bf6b986eea7cf36d5e"

describe("<AppRemoveModal />", () => {
  it("renders", () => {
    render(<AppRemoveModal appId={appId} />)

    expect(
      screen.getByRole("button", { name: /remove application/i }),
    ).toBeInTheDocument()
  })
  // it("meets minimum accessible requirements", async () => {
  //   const { container } = render(<AppRemoveModal appId={appId} />)

  //   expect(await axe(container)).toHaveNoViolations()
  // })
  it("handles modal open and close", async () => {
    const user = userEvent.setup()
    render(<AppRemoveModal appId={appId} />)

    const button = screen.getByRole("button", { name: /remove application/i })
    expect(button).toBeInTheDocument()

    user.click(button)

    await waitFor(() => {
      expect(
        screen.getByRole("dialog", { name: /remove this application/i }),
      ).toBeInTheDocument()
    })
    expect(screen.getByText(/app id/i)).toHaveTextContent(appId)

    user.click(screen.getByRole("button", { name: /cancel/i }))

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: /remove this application/i }),
      ).not.toBeInTheDocument()
    })
  })
})
