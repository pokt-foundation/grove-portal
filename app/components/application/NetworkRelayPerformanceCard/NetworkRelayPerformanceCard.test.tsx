import { expect } from "vitest"
import NetworkRelayPerformanceCard, {
  numbersFormatter,
} from "./NetworkRelayPerformanceCard"
import { render, screen } from "test/helpers"
import { month, today, week } from "~/models/relaymeter/relaymeter.data"

describe("<NetworkRelayPerformanceCard />", () => {
  it("renders card and props", () => {
    const heading = /relay performance/i

    render(<NetworkRelayPerformanceCard month={month} today={today} week={week} />)

    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /today/i })).toBeInTheDocument()
    expect(
      screen.getByText(numbersFormatter.format(today.Count.Total)),
    ).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /week/i })).toBeInTheDocument()
    expect(
      screen.getByText(numbersFormatter.format(week.Count.Total)),
    ).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /month/i })).toBeInTheDocument()
    expect(
      screen.getByText(numbersFormatter.format(month.Count.Total)),
    ).toBeInTheDocument()
  })
})
