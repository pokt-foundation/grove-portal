import { useFetcher } from "@remix-run/react"
import React, { Dispatch, useContext, useEffect, useMemo } from "react"
import { FeatureFlagsLoaderActionData } from "~/routes/api/featureflags"

export interface FeatureFlags {
  MULTI_LANGUAGE: string
  STRIPE_PAYMENT: string
  ENTERPRISE: string
  INFLUX_RELAY_ERROR: string
}

export const defaultFeatureFlags = {
  MULTI_LANGUAGE: ENV.FLAG_MULTI_LANGUAGE ?? "false",
  STRIPE_PAYMENT: ENV.FLAG_STRIPE_PAYMENT || "true",
  INFLUX_RELAY_ERROR: ENV.FLAG_INFLUX_RELAY_ERROR ?? "false",
  ENTERPRISE: "false" || ENV.FLAG_ENTERPRISE, //change once enterprise is available
}

interface IFeatureFlagsContext {
  flags: FeatureFlags
  submit: Dispatch<Partial<FeatureFlags>>
}

const FeatureFlagsContext = React.createContext<IFeatureFlagsContext>({
  flags: defaultFeatureFlags,
  submit: () => {},
})

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext)

  if (!context) {
    throw new Error("FeatureFlags cannot be used without declaring the provider")
  }

  return context
}

const FeatureFlagsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const fetcher = useFetcher<FeatureFlagsLoaderActionData>()
  const featureFlags = useMemo(
    () => fetcher.data?.POKT_FEATURE_FLAGS ?? defaultFeatureFlags,
    [fetcher],
  )

  const submit = (formData: Partial<FeatureFlags>) => {
    fetcher.submit(formData, {
      action: "/api/featureflags",
      method: "post",
    })
  }

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/api/featureflags")
    }
  }, [fetcher])

  const value = {
    flags: featureFlags,
    submit,
  }

  return (
    <FeatureFlagsContext.Provider value={value}>{children}</FeatureFlagsContext.Provider>
  )
}

export { FeatureFlagsContext, FeatureFlagsContextProvider }
