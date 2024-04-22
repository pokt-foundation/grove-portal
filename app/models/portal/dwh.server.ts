import { initPortalClient } from "~/models/portal/portal.server"
import { D2Chain, D2Stats, D2StatsDuration } from "~/models/portal/sdk"
import { dayjs } from "~/utils/dayjs"

export type DwhPeriod = number | DwhDefinedPeriod
export type DwhDefinedPeriod = "24hr" | "weekToDate" | "monthToDate"

type GetDwhDataBaseProps = {
  accountId: string
  method?: string
  applicationIDs?: string[]
  portalClient: ReturnType<typeof initPortalClient>
  period: DwhPeriod
  chainIDs?: string[]
}

type GetDwhDataProps =
  | (GetDwhDataBaseProps & {
      from?: null
      to?: null
    })
  | (Omit<GetDwhDataBaseProps, "period"> & {
      period?: null
      from: Date
      to: Date
    })

type GetDwhAggregateDataProps = GetDwhDataProps & {
  byHour?: boolean
}

export const getFromDate = (period: DwhPeriod) => {
  switch (period) {
    case "24hr":
      return dayjs().utc().subtract(24, "hour").toDate()
    case "weekToDate":
      return dayjs().utc().startOf("week").toDate()
    case "monthToDate":
      return dayjs().utc().startOf("month").toDate()
    default:
      return dayjs().utc().subtract(period, "day").toDate()
  }
}

export const getTotalRelays = async ({
  from,
  to,
  accountId,
  portalClient,
  applicationIDs,
  period,
  chainIDs,
}: GetDwhDataProps) => {
  const dateFrom = from ? from : getFromDate(period)
  const dateTo = to ? to : dayjs().utc().toDate()

  const totalRelaysResponse = await portalClient.getD2StatsData({
    params: {
      from: dateFrom,
      to: dateTo,
      accountID: accountId,
      ...(chainIDs && { chainIDs: chainIDs }),
      ...(applicationIDs && { applicationIDs: applicationIDs }),
    },
  })

  return totalRelaysResponse.getD2StatsData.data![0] as D2Stats
}

export const getRealtimeDataChains = async ({
  from,
  to,
  accountId,
  portalClient,
  applicationIDs,
  period,
}: GetDwhDataProps) => {
  const dateFrom = from ? from : getFromDate(period)
  const dateTo = to ? to : dayjs().utc().toDate()

  const getD2ChainsDataResponse = await portalClient.getD2ChainsData({
    params: {
      from: dateFrom,
      to: dateTo,
      accountID: accountId,
      ...(applicationIDs && { applicationIDs: applicationIDs }),
    },
  })

  return getD2ChainsDataResponse.getD2ChainsData.data as D2Chain[]
}

export const getAggregateRelays = async ({
  from,
  to,
  accountId,
  portalClient,
  applicationIDs,
  period,
  chainIDs,
  byHour,
}: GetDwhAggregateDataProps) => {
  const dateFrom = from ? from : getFromDate(period)
  const dateTo = to ? to : dayjs().utc().toDate()

  const getD2StatsData = await portalClient.getD2StatsData({
    params: {
      from: dateFrom,
      to: dateTo,
      accountID: accountId,
      fillZeroValues: true,
      ...(chainIDs && { chainIDs: chainIDs }),
      ...(applicationIDs && { applicationIDs: applicationIDs }),
      duration: [D2StatsDuration.Date, ...(byHour ? [D2StatsDuration.Hour] : [])],
    },
  })

  return getD2StatsData.getD2StatsData.data as D2Stats[]
}
