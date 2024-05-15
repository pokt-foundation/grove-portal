import { initPortalClient } from "~/models/portal/portal.server"
import { D2Chain, D2Stats, D2StatsDuration, D2StatsView } from "~/models/portal/sdk"
import { dayjs } from "~/utils/dayjs"

export type DwhPeriod = number | DwhDefinedPeriod
export type DwhDefinedPeriod = "24hr" | "weekToDate" | "monthToDate"

type GetDwhDataProps = {
  accountId: string
  method?: string
  applicationIDs?: string[]
  portalClient: ReturnType<typeof initPortalClient>
  period: DwhPeriod
  chainIDs?: string[]
}

type GetDwhAggregateDataProps = GetDwhDataProps & {
  byHour?: boolean
}

type GetBillingPeriodRelaysProps = Pick<GetDwhDataProps, "accountId" | "portalClient"> & {
  from: Date
  to: Date
}

export const getDateFrom = (period: DwhPeriod) => {
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
  accountId,
  portalClient,
  applicationIDs,
  period,
  chainIDs,
}: GetDwhDataProps) => {
  const dateFrom = getDateFrom(period)
  const dateTo = dayjs().utc().toDate()

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

export const getBillingPeriodRelays = async ({
  from,
  to,
  accountId,
  portalClient,
}: GetBillingPeriodRelaysProps) => {
  const params = {
    from,
    to,
    accountID: accountId,
    view: [D2StatsView.ChainId, D2StatsView.ApplicationId],
  }

  const totalRelaysResponse = await portalClient.getD2StatsData({
    params,
  })

  return totalRelaysResponse.getD2StatsData.data as D2Stats[]
}

export const getRealtimeDataChains = async ({
  accountId,
  portalClient,
  applicationIDs,
  period,
}: GetDwhDataProps) => {
  const dateFrom = getDateFrom(period)
  const dateTo = dayjs().utc().toDate()

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
  accountId,
  portalClient,
  applicationIDs,
  period,
  chainIDs,
  byHour,
}: GetDwhAggregateDataProps) => {
  const dateFrom = getDateFrom(period)
  const dateTo = dayjs().utc().toDate()

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
