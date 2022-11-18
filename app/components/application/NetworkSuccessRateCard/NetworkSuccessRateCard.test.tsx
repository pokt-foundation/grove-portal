import { expect } from "vitest"
import NetworkSuccessRateCard from "./NetworkSuccessRateCard"
import { render, screen } from "test/helpers"
import { month } from "~/models/relaymeter/relaymeter.data"

describe("<NetworkSuccessRateCard />", () => {
  it("renders card and props", () => {
    render(<NetworkSuccessRateCard relays={month} />)

    expect(
      screen.getByRole("heading", {
        name: Intl.NumberFormat().format(month.Count.Success),
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/successful relays/i)).toBeInTheDocument()
    expect(screen.getByText(/last 7 days/i)).toBeInTheDocument()
  })
})
