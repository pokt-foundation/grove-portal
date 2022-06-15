import { useFetcher } from "@remix-run/react"
import React, { useMemo, useContext, Dispatch, useEffect } from "react"
import { UserLoaderActionData } from "~/routes/api/user"
import { Language } from "~/context/TranslateContext"
import { Auth0Profile } from "remix-auth-auth0"

export interface UserPreference {
  language: Language
}

export const defaultUserPreference = {
  language: "en" as Language,
}

interface IUserContext {
  user: {
    profile: Auth0Profile | undefined
    preferences: UserPreference
  }
  submit: Dispatch<Partial<UserPreference>>
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
  const userPref = useMemo(
    () => fetcher.data?.preferences ?? defaultUserPreference,
    [fetcher],
  )
  const profile = useMemo(() => fetcher.data?.profile ?? undefined, [fetcher])

  const submit = (formData: Partial<UserPreference>) => {
    fetcher.submit(formData, {
      action: "/api/user",
      method: "post",
    })
  }

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/api/user")
    }
  }, [fetcher])

  const value = {
    user: {
      profile: profile,
      preferences: userPref,
    },
    submit,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserContext, UserContextProvider }
