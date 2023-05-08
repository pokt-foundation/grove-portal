import { expect } from "vitest"
import AppPlansOverview from "./AppPlansOverview"
import { render, screen } from "test/helpers"
import schema from "~/locales/en"
import { PayPlanType } from "~/models/portal/sdk"

const freePlan = PayPlanType.FreetierV0
const paidPlan = PayPlanType.PayAsYouGoV0

describe("<AppPlansOverview />", () => {
  it("renders free plan information", () => {
    const planTitle = schema.AppPlansOverview.planDetails.FREETIER_V0.title
    const description = schema.AppPlansOverview.planDetails.FREETIER_V0.description
    const pricing = schema.AppPlansOverview.planDetails.FREETIER_V0.pricing
    const relayLimit = schema.AppPlansOverview.planDetails.FREETIER_V0.relayLimit
    const appsLimit = schema.AppPlansOverview.planDetails.FREETIER_V0.appsLimit
    const chainAccess = schema.AppPlansOverview.planDetails.FREETIER_V0.chainAccess

    render(<AppPlansOverview planType={freePlan} />)
    expect(screen.getByText(planTitle)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.getByText(pricing)).toBeInTheDocument()
    expect(screen.getByText(relayLimit)).toBeInTheDocument()
    expect(screen.getByText(appsLimit)).toBeInTheDocument()
    expect(screen.getByText(chainAccess)).toBeInTheDocument()
  })
  it("renders paid plan information", () => {
    const planTitle = schema.AppPlansOverview.planDetails.PAY_AS_YOU_GO_V0.title
    const description = schema.AppPlansOverview.planDetails.PAY_AS_YOU_GO_V0.description
    const description2 = schema.AppPlansOverview.planDetails.PAY_AS_YOU_GO_V0.description2
    const pricing = schema.AppPlansOverview.planDetails.PAY_AS_YOU_GO_V0.pricing
    const relayLimit = schema.AppPlansOverview.planDetails.PAY_AS_YOU_GO_V0.relayLimit
    const appsLimit = schema.AppPlansOverview.planDetails.PAY_AS_YOU_GO_V0.appsLimit
    const chainAccess = schema.AppPlansOverview.planDetails.PAY_AS_YOU_GO_V0.chainAccess

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
    const pricing = schema.AppPlansOverview.planDetailsTitles.pricing
    const relayLimit = schema.AppPlansOverview.planDetailsTitles.relayLimit
    const chainAccess = schema.AppPlansOverview.planDetailsTitles.chainAccess
    const appsLimit = schema.AppPlansOverview.planDetailsTitles.appsLimit
    const cardTitle = schema.AppPlansOverview.planDetailsTitles.overviewHeader

    render(<AppPlansOverview planType={freePlan} />)
    expect(screen.getByText(cardTitle)).toBeInTheDocument()
    expect(screen.getByText(pricing)).toBeInTheDocument()
    expect(screen.getByText(relayLimit)).toBeInTheDocument()
    expect(screen.getByText(chainAccess)).toBeInTheDocument()
    expect(screen.getByText(appsLimit)).toBeInTheDocument()
    expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(2)
    expect(screen.queryAllByRole("heading", { level: 5 })).toHaveLength(5)
  })
})
