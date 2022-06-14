import { useFetcher } from "@remix-run/react"
import React, { useMemo, useContext, Dispatch, useEffect, useCallback } from "react"
import { UserLoaderActionData } from "~/routes/api/user"
import { Language } from "~/context/TranslateContext"
import { Auth0Profile } from "remix-auth-auth0"
import { UserLB } from "@pokt-foundation/portal-types"

export const defaultUserPreference = {
  language: "en" as Language,
}

interface IUserContext {
  user: {
    profile: Auth0Profile | undefined
    preferences: UserPreferenceFormData
  }
  submit: Dispatch<Partial<UserPreferenceFormData>>
}

export interface UserPreferenceFormData {
  language: Language
  endpoints?: string // stringified
}

export interface UserPreference {
  language: Language
  endpoints?: {
    [key in UserLB["id"]]: string[]
  }
}

const UserContext = React.createContext<IUserContext>({
  user: {
    profile: undefined,
    preferences: defaultUserPreference,
  },
  submit: () => {},
})

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUser cannot be used without declaring the provider")
  }

  return context
}

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const fetcher = useFetcher<UserLoaderActionData>()
  const userPref = useMemo(() => {
    console.log(fetcher.data)
    return fetcher.data?.preferences ?? defaultUserPreference
  }, [fetcher.data])
  const profile = useMemo(() => fetcher.data?.profile ?? undefined, [fetcher])

  const submit = useCallback(
    (formData: Partial<UserPreferenceFormData>) => {
      fetcher.submit(formData, {
        action: "/api/user",
        method: "post",
      })
    },
    [fetcher],
  )

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/api/user")
    }
  }, [fetcher])

  const value = useMemo(
    () => ({
      user: {
        profile: profile,
        preferences: userPref,
      },
      submit,
    }),
    [profile, userPref, submit],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserContext, UserContextProvider }
