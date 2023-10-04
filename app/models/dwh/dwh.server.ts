import dayjs from "dayjs"
import { Configuration, UserApi } from "./sdk"
import { AnalyticsRelaysAggregated } from "~/models/dwh/sdk"
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

type GetRelaysProps = {
  category: "account_id" | "application_id"
  categoryValue: string[]
  days: number
}

export const getTotalRelays = async ({
  category,
  categoryValue,
  days,
}: GetRelaysProps) => {
  const dwh = initDwhClient()

  let total
  const totalReponse = await dwh.analyticsRelaysTotalCategoryGet({
    category,
    categoryValue,
    from: dayjs().subtract(days, "day").toDate(),
    to: dayjs().toDate(),
  })

  if (!totalReponse.data || totalReponse.data.length < 1) {
    // empty state data
    total = {
      from: dayjs().subtract(days, "day").toDate(),
      to: dayjs().toDate(),
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
    from: dayjs().subtract(days, "day").toDate(),
    to: dayjs().toDate(),
  })

  console.log(aggregateResponse)

  // const aggregateJsonData = (await aggregateResponse.raw.json()) as {
  //   Data: AnalyticsRelaysAggregated[]
  // }

  // const aggregateData = aggregateJsonData.Data.map(
  //   ResponseDataInnerFromJSON,
  // ) as AnalyticsRelaysAggregated[]

  if (!aggregateResponse.data) {
    console.log("empty aggregate data")
    // empty state data
    aggregate = Array.from(Array(days).keys())
      .map((num) => ({
        date: dayjs().subtract(num, "day").toDate(),
        countTotal: Math.ceil(Math.random() * 1000000),
        avgLatency: Number((Math.random() * 250.32).toFixed(2)),
        rateSuccess: Number((Math.random() * 99.32).toFixed(2)),
        rateError: Number((Math.random() * 0.68).toFixed(2)),
      }))
      .reverse()
  } else {
    aggregate = (aggregateResponse.data as AnalyticsRelaysAggregated[]).sort((a, b) =>
      dayjs(a.date).isBefore(b.date) ? -1 : 1,
    )

    // handle days with no data
    if (aggregate.length < days) {
      aggregate = Array.from(Array(days).keys())
        .reverse()
        .map((index) => {
          let day = dayjs().subtract(index, "day").toDate()
          const dateExists = (
            aggregateResponse.data as AnalyticsRelaysAggregated[]
          )?.find((data) => dayjs(data.date).isSame(day, "day"))
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
