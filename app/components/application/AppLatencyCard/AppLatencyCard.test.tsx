import { expect } from "vitest"
import { UserLBLatencyBucket } from "@pokt-foundation/portal-types"
import AppLatencyCard from "./AppLatencyCard"
import { render, screen } from "test/helpers"

let hourlyLatency: UserLBLatencyBucket[] = [
  { bucket: "2022-06-22T16:00:00Z", latency: 0.4508345 },
  { bucket: "2022-06-22T17:00:00Z", latency: 0.3707504 },
  { bucket: "2022-06-22T18:00:00Z", latency: 0.3891401 },
  { bucket: "2022-06-22T19:00:00Z", latency: 0.3464781 },
  { bucket: "2022-06-22T20:00:00Z", latency: 0.3391308 },
  { bucket: "2022-06-22T21:00:00Z", latency: 0.4009569 },
  { bucket: "2022-06-22T22:00:00Z", latency: 0.3583696 },
  { bucket: "2022-06-22T23:00:00Z", latency: 0.4000581 },
  { bucket: "2022-06-23T00:00:00Z", latency: 0.7317213 },
  { bucket: "2022-06-23T01:00:00Z", latency: 0.6468081 },
  { bucket: "2022-06-23T02:00:00Z", latency: 0.7802169 },
  { bucket: "2022-06-23T03:00:00Z", latency: 0.6069755 },
  { bucket: "2022-06-23T04:00:00Z", latency: 0.6491331 },
  { bucket: "2022-06-23T05:00:00Z", latency: 0.8328273 },
  { bucket: "2022-06-23T06:00:00Z", latency: 0.6222603 },
  { bucket: "2022-06-23T07:00:00Z", latency: 0.6227213 },
  { bucket: "2022-06-23T08:00:00Z", latency: 0.6986864 },
  { bucket: "2022-06-23T09:00:00Z", latency: 0.5179912 },
  { bucket: "2022-06-23T10:00:00Z", latency: 0.5932587 },
  { bucket: "2022-06-23T11:00:00Z", latency: 0.5917198 },
  { bucket: "2022-06-23T12:00:00Z", latency: 0.5471871 },
  { bucket: "2022-06-23T13:00:00Z", latency: 0.5451592 },
  { bucket: "2022-06-23T14:00:00Z", latency: 0.5515069 },
]

describe("<AppLatencyCard />", () => {
  it("renders card with chart", () => {
    render(<AppLatencyCard hourlyLatency={hourlyLatency} />)

    expect(screen.getByRole("heading", { name: /average latency/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /ms/i })).toBeInTheDocument()

    // this chart seems to have no accessibility values
    expect(document.querySelector("svg")).toBeInTheDocument()
  })
})
