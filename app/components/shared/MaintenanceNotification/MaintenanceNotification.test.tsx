import { expect } from "vitest"
import MaintenanceNotification from "./MaintenanceNotification"
import { render, screen } from "test/helpers"

describe("MaintenanceNotification", () => {
  it("renders maintenance notification when maintenanceMode is true", () => {
    render(<MaintenanceNotification maintenanceMode="true" />)
    expect(screen.getByText("Scheduled Maintenance Notice")).toBeInTheDocument()
  })

  it("does not render maintenance notification when maintenanceMode is false", () => {
    render(<MaintenanceNotification maintenanceMode="false" />)
    expect(screen.queryByText("Scheduled Maintenance Notice")).not.toBeInTheDocument()
  })
})
