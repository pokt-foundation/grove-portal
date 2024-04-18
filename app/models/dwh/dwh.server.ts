import { AnalyticsRelaysAggregated, Configuration, UserApi } from "./sdk"
import { dayjs } from "~/utils/dayjs"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { initPortalClient } from "~/models/portal/portal.server"
import { D2StatsDuration, D2StatsView } from "~/models/portal/sdk"

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

type GetD2DataBaseProps = {
  accountId: string
  method?: string
  applicationIDs?: string[]
  portalClient: ReturnType<typeof initPortalClient>
  days: number
  chainIDs?: string[]
  byHour?: boolean
}

type GetD2DataProps =
  | (GetD2DataBaseProps & {
      from?: null
      to?: null
    })
  | (Omit<GetD2DataBaseProps, "days"> & {
      days?: null
      from: Date
      to: Date
    })

export const getFromToDates = (days: number) => {
  if (days === 1) {
    return {
      from: dayjs().utc().subtract(24, "hour").toDate(),
      to: dayjs().utc().toDate(),
    }
  }

  return {
    from: dayjs().utc().subtract(days, "day").toDate(),
    to: dayjs().utc().toDate(),
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
  days,
  chainIDs,
}: GetD2DataProps) => {
  const dateFrom = from ? from : getFromToDates(days).from
  const dateTo = to ? to : getFromToDates(days).to

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
  days,
}: GetD2DataProps) => {
  const dateFrom = from ? from : getFromToDates(days).from
  const dateTo = to ? to : getFromToDates(days).to

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
  days,
  chainIDs,
  byHour,
}: GetD2DataProps) => {
  const dateFrom = from ? from : getFromToDates(days).from
  const dateTo = to ? to : getFromToDates(days).to

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
