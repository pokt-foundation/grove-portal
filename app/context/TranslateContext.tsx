import React, { useMemo, useContext } from "react"
import en from "~/locales/en.json"
import fr from "~/locales/fr.json"
import { useUserPreference } from "./UserPreferenceContext"

const languages = ["en", "fr"] as const
const translate: Translate = {
  en: en,
  fr: fr,
}

interface TranslationData {
  search: {
    label: string
    placeholder: string
  }
  terms: {
    address: string
    addresses: string
    app: string
    apps: string
    block: string
    blocks: string
    node: string
    nodes: string
    network: string
    networks: string
    support: string
    transaction: string
    transactions: string
  }
  error: {
    default: string
    browser: string
    server: string
  }
  faq: {
    title: string
    subtitle: string
    faqs: {
      question: string
      answer: string
    }[]
  }
}

export type Language = typeof languages[number]
type Translate = {
  [K in Language]: TranslationData
}

interface ITranslateContext {
  t: TranslationData
  language: Language
  languages: typeof languages
}

const TranslateContext = React.createContext<ITranslateContext>({
  t: translate.en,
  language: "en",
  languages,
})

export function useTranslate() {
  const context = useContext(TranslateContext)

  if (!context) {
    throw new Error("Translations cannot be used without declaring the provider")
  }

  return context
}

const TranslateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const userPref = useUserPreference()
  const language = useMemo(() => userPref.value.language, [userPref.value])
  const t = useMemo(() => translate[language as Language], [language])

  const memoValue = useMemo(
    () => ({
      t,
      language,
      languages,
    }),
    [t, language],
  )

  return (
    <TranslateContext.Provider value={memoValue}>{children}</TranslateContext.Provider>
  )
}

export { TranslateContext, TranslateContextProvider }
