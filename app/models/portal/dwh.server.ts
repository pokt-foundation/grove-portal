import { AnalyticsRelaysAggregated, Configuration, UserApi } from "../dwh/sdk"
import { initPortalClient } from "~/models/portal/portal.server"
import { D2StatsDuration } from "~/models/portal/sdk"
import { dayjs } from "~/utils/dayjs"
import { getRequiredServerEnvVar } from "~/utils/environment"

function initDwhClient(): UserApi {
  const dwh = new UserApi(
    new Configuration({
      basePath: getRequiredServerEnvVar("DWH_API_URL"),
      apiKey: getRequiredServerEnvVar("DWH_API_KEY"),
      headers: {
        "Content-Type": "application/json",
      },
      fetchApi: fetch,
    }),
  )

  return dwh
}

export { initDwhClient }

export type DwhPeriod = number | DwhDefinedPeriod
export type DwhDefinedPeriod = "24hr" | "weekToDate" | "monthToDate"

// we dont get data for today, so dont show an empty value
const startOfYesterday = dayjs()
  .utc()
  .millisecond(0)
  .second(0)
  .minute(0)
  .hour(0)
  .subtract(1, "day")

type GetRelaysProps = {
  category: "account_id" | "application_id"
  categoryValue: string[]
  days: number
}

type GetTotalRelaysProps =
  | (GetRelaysProps & {
      from?: null
      to?: null
    })
  | (Omit<GetRelaysProps, "days"> & {
      days?: null
      from: Date
      to: Date
    })

type GetDwhDataBaseProps = {
  accountId: string
  method?: string
  applicationIDs?: string[]
  portalClient: ReturnType<typeof initPortalClient>
  period: DwhPeriod
  chainIDs?: string[]
}

type GetD2DataProps =
  | (GetDwhDataBaseProps & {
      from?: null
      to?: null
    })
  | (Omit<GetDwhDataBaseProps, "days"> & {
      days?: null
      from: Date
      to: Date
    })

type GetDwhAggregateDataProps = GetD2DataProps & {
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
  category,
  categoryValue,
  days,
  from,
  to,
}: GetTotalRelaysProps) => {
  const dwh = initDwhClient()

  let total
  const dataFrom = from ? from : startOfYesterday.subtract(days as number, "day").toDate()
  const dateTo = to ? to : startOfYesterday.toDate()
  const totalReponse = await dwh.analyticsRelaysTotalCategoryGet({
    category,
    categoryValue,
    from: dataFrom,
    to: dateTo,
  })

  if (!totalReponse.data || totalReponse.data.length < 1) {
    // empty state data
    total = {
      from: dataFrom,
      to: dateTo,
      countTotal: 0,
      avgLatency: 0,
      rateSuccess: 0,
      rateError: 0,
    }
  } else {
    total = totalReponse.data![0]
  }

  return total
}

export const getD2TotalRelays = async ({
  from,
  to,
  accountId,
  portalClient,
  applicationIDs,
  period,
  chainIDs,
}: GetD2DataProps) => {
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

  return totalRelaysResponse.getD2StatsData.data![0]
}

export const getRealtimeDataChains = async ({
  from,
  to,
  accountId,
  portalClient,
  applicationIDs,
  period,
}: GetD2DataProps) => {
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

  return getD2ChainsDataResponse.getD2ChainsData.data
}

export const getD2AggregateRelays = async ({
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

  return await portalClient.getD2StatsData({
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
}

export const getAggregateRelays = async ({
  category,
  categoryValue,
  days,
}: GetRelaysProps) => {
  const dwh = initDwhClient()

  let aggregate
  const aggregateResponse = await dwh.analyticsRelaysAggregatedCategoryGet({
    category,
    categoryValue,
    from: startOfYesterday.subtract(days, "day").toDate(),
    to: startOfYesterday.toDate(),
  })

  if (!aggregateResponse.data) {
    console.log("empty aggregate data")
    // empty state data
    aggregate = Array.from(Array(days).keys())
      .map((num) => ({
        date: startOfYesterday.subtract(num, "day").toDate(),
        countTotal: Math.ceil(Math.random() * 1000000),
        avgLatency: Number((Math.random() * 250.32).toFixed(2)),
        rateSuccess: Number((Math.random() * 99.32).toFixed(2)),
        rateError: Number((Math.random() * 0.68).toFixed(2)),
      }))
      .reverse()
  } else {
    aggregate = (aggregateResponse.data as AnalyticsRelaysAggregated[]).sort((a, b) =>
      dayjs(a.date).utc().isBefore(b.date) ? -1 : 1,
    )

    // handle days with no data
    if (aggregate.length < days) {
      aggregate = Array.from(Array(days).keys())
        .reverse()
        .map((index) => {
          let day = startOfYesterday.subtract(index, "day").toDate()
          const dateExists = (
            aggregateResponse.data as AnalyticsRelaysAggregated[]
          )?.find((data) => dayjs(data.date).utc().isSame(day, "day"))
          if (dateExists) {
            return dateExists
          } else {
            return {
              date: day,
              countTotal: null,
              avgLatency: null,
              rateSuccess: null,
              rateError: null,
            }
          }
        })
    }
  }

  return aggregate
}
