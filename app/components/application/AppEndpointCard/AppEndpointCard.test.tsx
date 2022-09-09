import { expect } from "vitest"
import AppEndpointCard from "./AppEndpointCard"
import { render, screen } from "test/helpers"
import { IUserContext, UserContext } from "~/context/UserContext"
import { endpoint, blockchains } from "~/models/portal/portal.data"
import { ProcessedEndpoint } from "~/models/portal/sdk"
import { ChainMetadata, prefixFromChainId } from "~/utils/chainUtils"

let app: ProcessedEndpoint

let userValue: IUserContext

beforeEach(() => {
  //reset defaults before each test
  const chain = endpoint.apps ? endpoint.apps[0].chain : "0021"
  userValue = {
    submit: vitest.fn(),
    load: vitest.fn(),
    state: "idle",
    type: "done",
    data: {
      profile: undefined,
      preferences: {
        language: "en",
        showExpandedLegacyBanner: true,
        endpoints: {
          [endpoint.id as string]: [chain ?? "0021"],
        },
      },
    },
  }
})

describe("<AppEndpointCard />", () => {
  it("loads card", () => {
    render(
      <UserContext.Provider value={userValue}>
        <AppEndpointCard app={endpoint} blockchains={blockchains} />
      </UserContext.Provider>,
    )
    const header = screen.getByRole("heading")
    expect(header).toHaveTextContent(/endpoint/i)
  })
  it("loads chain with image if gigastake is false", () => {
    render(
      <UserContext.Provider value={userValue}>
        <AppEndpointCard app={endpoint} blockchains={blockchains} />
      </UserContext.Provider>,
    )

    const chain = endpoint.apps ? endpoint.apps[0].chain : "0021"
    const name = blockchains.find((c) => c.id === chain)?.description
    const image = screen.getAllByRole("img", { name: String(name) })
    expect(image[0]).toBeInTheDocument()
  })
  it("loads add chain button if gigastake is true", () => {
    endpoint.gigastake = true
    render(
      <UserContext.Provider value={userValue}>
        <AppEndpointCard app={endpoint} blockchains={blockchains} />
      </UserContext.Provider>,
    )

    const button = screen.getByRole("button", { name: /add new/i })
    expect(button).toBeInTheDocument()
  })
})
