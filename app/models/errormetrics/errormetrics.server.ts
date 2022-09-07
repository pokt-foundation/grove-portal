import { fetch } from "@remix-run/node"
import { getRequiredClientEnvVar } from "~/utils/environment"

export type ErrorMetric = {
  applicationpublickey: string
  blockchain: string
  bytes: number
  code: string
  elapsedtime: number
  message: string
  method: string
  nodepublickey: string
  timestamp: string
}

// Error Metrics
export const getErrorMetrics = async (publicKeys: string[]): Promise<ErrorMetric[]> => {
  const metricsURL = `${getRequiredClientEnvVar(
    "ERROR_METRICS_API_URL",
  )}/error?or=(${publicKeys
    .map((pk: string) => `applicationpublickey.eq.${pk}`)
    .join(
      ",",
    )})&limit=50&order=timestamp.desc&or=(method.neq.synccheck,method.neq.checks)`

  const res = await fetch(metricsURL, {
    timeout: 1000,
  })

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  const body = await res.json()
  const metrics = body as ErrorMetric[]

  return metrics
}
