import { expect } from "vitest"
import AppPlansOverview from "./AppPlansOverview"
import { render, screen } from "test/helpers"

const freePlan = "free"
const paidPlan = "paid"

describe("<AppPlansOverview />", () => {
  it("renders free plan information", () => {
    const planTitle = /Always Free/i
    const description =
      /Access to reliable, censor resistant infrastructure. Free up to 250k relays per day./i
    const pricing = /\$0.00/i
    const relayLimit = /250k per app per day/i
    const appsLimit = /Up to 2 Applicaitions/i
    const chainAccess = /No limit/i

    render(<AppPlansOverview planType={freePlan} />)
    expect(screen.getByText(planTitle)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.getByText(pricing)).toBeInTheDocument()
    expect(screen.getByText(relayLimit)).toBeInTheDocument()
    expect(screen.getByText(appsLimit)).toBeInTheDocument()
    expect(screen.getByText(chainAccess)).toBeInTheDocument()
  })
  it("renders paid plan information", () => {
    const planTitle = /Pay As You Go/i
    const description =
      /250k free relays per day, per app. Beyond that, pay only for what you use. The counter resets every 24h but you’ll only get billed monthly. Even better, after 24 months of paid relays, you’ll receive POKT to stake for continued service. No more payments./i
    const description2 = /No more sunk costs. Just fast, reliable infrastructure./i
    const pricing = /Pay per relay \+ 250K Free Relays/i
    const relayLimit = /No limit/i
    const appsLimit = /Up to 2 Applicaitions/i
    const chainAccess = /No limit/i

    render(<AppPlansOverview planType={paidPlan} />)
    expect(screen.getByText(planTitle)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.getByText(description2)).toBeInTheDocument()
    expect(screen.getByText(pricing)).toBeInTheDocument()
    expect(screen.getAllByText(relayLimit)[0]).toBeInTheDocument()
    expect(screen.getByText(appsLimit)).toBeInTheDocument()
    expect(screen.getAllByText(chainAccess)[1]).toBeInTheDocument()
  })
  it("renders plan information titles", () => {
    const pricing = /Pricing/i
    const relayLimit = /Relay Limit/i
    const chainAccess = /Chain Access/i
    const appsLimit = /Apps Limit/i
    const cardTitle = /Flexible plans that grow with your app/i

    render(<AppPlansOverview planType={freePlan} />)
    expect(screen.getByText(cardTitle)).toBeInTheDocument()
    expect(screen.getByText(pricing)).toBeInTheDocument()
    expect(screen.getByText(relayLimit)).toBeInTheDocument()
    expect(screen.getByText(chainAccess)).toBeInTheDocument()
    expect(screen.getByText(appsLimit)).toBeInTheDocument()
    expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(2)
    expect(screen.queryAllByRole("heading", { level: 4 })).toHaveLength(4)
  })
})
