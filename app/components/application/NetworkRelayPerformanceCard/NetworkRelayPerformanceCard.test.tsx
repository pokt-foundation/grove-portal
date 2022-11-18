import { expect } from "vitest"
import NetworkRelayPerformanceCard, {
  numbersFormatter,
} from "./NetworkRelayPerformanceCard"
import { render, screen } from "test/helpers"
import { relayMetric } from "~/models/relaymeter/relaymeter.data"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"

describe("<NetworkRelayPerformanceCard />", () => {
  it("renders card and props", () => {
    const heading = /relay performance/i

    const month: RelayMetric = {
      ...relayMetric,
      Count: {
        ...relayMetric.Count,
        Success: 999999,
        Failure: 1,
        Total: 1000000,
      },
    }
    const today: RelayMetric = {
      ...relayMetric,
      Count: {
        ...relayMetric.Count,
        Success: 9,
        Failure: 1,
        Total: 10,
      },
    }
    const week: RelayMetric = {
      ...relayMetric,
      Count: {
        ...relayMetric.Count,
        Success: 999,
        Failure: 1,
        Total: 1000,
      },
    }

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
