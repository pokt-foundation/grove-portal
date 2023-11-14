import { RelayMetric } from "./relaymeter.server"
import { AccountAppRelays } from "~/routes/account.$accountId.settings.plan/route"

export const relayMetric: AccountAppRelays = {
  Count: {
    Success: 0,
    Failure: 0,
    Total: 0,
  },
  From: "2022-08-22T00:00:00Z",
  To: "2022-08-23T00:00:00Z",
  name: "account",
  appEmoji: "emoji",
}

export const today: RelayMetric = {
  ...relayMetric,
  Count: {
    ...relayMetric.Count,
    Success: 9,
    Failure: 1,
    Total: 10,
  },
}

export const week: RelayMetric = {
  ...relayMetric,
  Count: {
    ...relayMetric.Count,
    Success: 999,
    Failure: 1,
    Total: 1000,
  },
}

export const month: RelayMetric = {
  ...relayMetric,
  Count: {
    ...relayMetric.Count,
    Success: 999999,
    Failure: 1,
    Total: 1000000,
  },
}

export const relayMetricPerWeek: RelayMetric[] = Array(7).fill(relayMetric)
