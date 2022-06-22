import { SubmitFunction, useFetcher } from "@remix-run/react"
import React, { useMemo, useContext, useEffect } from "react"
import { UserLoaderActionData } from "~/routes/api/user"
import { Language } from "~/context/TranslateContext"
import { UserLB } from "@pokt-foundation/portal-types"

export const defaultUserPreference = {
  language: "en" as Language,
}

export const defaultUserData = {
  profile: undefined,
  preferences: defaultUserPreference,
}

interface IUserContext {
  data: UserLoaderActionData
  load: (href: string) => void
  state: "idle" | "submitting" | "loading"
  submit: SubmitFunction
  type:
    | "init"
    | "actionSubmission"
    | "actionRedirect"
    | "loaderSubmission"
    | "actionReload"
    | "normalLoad"
    | "done"
}

export interface UserPreferenceFormData {
  language: Language
  endpoints?: string // stringified
}

export interface UserPreference {
  language: Language
  endpoints?: {
    [key: UserLB["id"]]: string[]
  }
}

const UserContext = React.createContext<IUserContext>({
  data: defaultUserData,
  load: () => {},
  state: "idle",
  submit: () => {},
  type: "init",
})

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUser cannot be used without declaring the provider")
  }

  return context
}

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useFetcher<UserLoaderActionData>()

  useEffect(() => {
    if (user.type === "init") {
      user.load("/api/user")
    }
  }, [user])

  const value = useMemo(
    () => ({
      ...user,
      data: user.data ?? defaultUserData,
    }),
    [user],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserContext, UserContextProvider }
