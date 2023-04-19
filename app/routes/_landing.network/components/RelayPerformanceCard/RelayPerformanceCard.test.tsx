import { expect } from "vitest"
import RelayPerformanceCard, { numbersFormatter } from "./RelayPerformanceCard"
import { render, screen } from "test/helpers"
import { month, today, week } from "~/models/relaymeter/relaymeter.data"

describe("<RelayPerformanceCard />", () => {
  it("renders card and props", () => {
    const heading = /relay performance/i

    render(<RelayPerformanceCard month={month} today={today} week={week} />)

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
