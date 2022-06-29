import { expect } from "vitest"
import AppEndpointCard from "./AppEndpointCard"
import { render, screen } from "test/helpers"
import { ChainMetadata, prefixFromChainId } from "~/utils/chainUtils"
import { UserLB } from "~/models/portal.server"
import { IUserContext, UserContext } from "~/context/UserContext"

let app: UserLB

let userValue: IUserContext

beforeEach(() => {
  //reset defaults before each test
  app = {
    id: "605238bf6b986eea7cf36d5e",
    chain: "0003",
    gigastake: false,
    freeTier: true,
    apps: [],
    gatewaySettings: {},
    name: "",
    notificationSettings: {},
    status: "IN_SERVICE",
    user: "60ec71e6980d0b0034b3f2f3",
  }
  userValue = {
    submit: vitest.fn(),
    load: vitest.fn(),
    state: "idle",
    type: "done",
    data: {
      profile: undefined,
      preferences: {
        language: "en",
        endpoints: {
          [app.id as string]: [app.chain],
        },
      },
    },
  }
})

describe("<AppEndpointCard />", () => {
  it("loads card", () => {
    render(
      <UserContext.Provider value={userValue}>
        <AppEndpointCard app={app} />
      </UserContext.Provider>,
    )
    const header = screen.getByRole("heading")
    expect(header).toHaveTextContent(/endpoint/i)
  })
  it("loads chain with image if gigastake is false", () => {
    render(
      <UserContext.Provider value={userValue}>
        <AppEndpointCard app={app} />
      </UserContext.Provider>,
    )

    const { name } = prefixFromChainId(app.chain) as ChainMetadata
    const image = screen.getAllByRole("img", { name: name })
    expect(image[0]).toBeInTheDocument()
  })
  it("loads add chain button if gigastake is true", () => {
    app.gigastake = true
    render(
      <UserContext.Provider value={userValue}>
        <AppEndpointCard app={app} />
      </UserContext.Provider>,
    )

    const button = screen.getByRole("button", { name: /add new/i })
    expect(button).toBeInTheDocument()
  })
})
