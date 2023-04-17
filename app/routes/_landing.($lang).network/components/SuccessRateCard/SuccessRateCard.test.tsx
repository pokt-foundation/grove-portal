import { expect } from "vitest"
import SuccessRateCard from "./SuccessRateCard"
import { render, screen } from "test/helpers"
import { month } from "~/models/relaymeter/relaymeter.data"

describe("<SuccessRateCard />", () => {
  it("renders card and props", () => {
    render(<SuccessRateCard relays={month} />)

    expect(
      screen.getByRole("heading", {
        name: Intl.NumberFormat().format(month.Count.Success),
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/successful relays/i)).toBeInTheDocument()
    expect(screen.getByText(/last 7 days/i)).toBeInTheDocument()
  })
})
