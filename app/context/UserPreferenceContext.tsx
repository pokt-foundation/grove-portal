import { useFetcher } from "@remix-run/react"
import React, { useMemo, useContext, Dispatch, useEffect } from "react"
import { UserPreferenceLoaderActionData } from "~/routes/api/userpreference"
import { Language } from "~/context/TranslateContext"

export interface UserPreference {
  language: Language
}

export const defaultUserPreference = {
  language: "en" as Language,
}

interface IUserPreferenceContext {
  value: UserPreference
  submit: Dispatch<Partial<UserPreference>>
}

const UserPreferenceContext = React.createContext<IUserPreferenceContext>({
  value: defaultUserPreference,
  submit: () => {},
})

export function useUserPreference() {
  const context = useContext(UserPreferenceContext)

  if (!context) {
    throw new Error("UserPreference cannot be used without declaring the provider")
  }

  return context
}

const UserPreferenceContextProvider = ({ children }: { children: React.ReactNode }) => {
  const fetcher = useFetcher<UserPreferenceLoaderActionData>()
  const userPref = useMemo(
    () => fetcher.data?.POKT_USER_PREF ?? defaultUserPreference,
    [fetcher],
  )

  const submit = (formData: Partial<UserPreference>) => {
    fetcher.submit(formData, {
      action: "/api/userpreference",
      method: "post",
    })
  }

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/api/userpreference")
    }
  }, [fetcher])

  const value = {
    value: userPref,
    submit,
  }

  return (
    <UserPreferenceContext.Provider value={value}>
      {children}
    </UserPreferenceContext.Provider>
  )
}

export { UserPreferenceContext, UserPreferenceContextProvider }
