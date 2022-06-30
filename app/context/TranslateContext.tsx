import React, { useMemo, useContext } from "react"
import en from "~/locales/en.json"
import fr from "~/locales/fr.json"
import { useUser } from "./UserContext"

const languages = ["en", "fr"] as const
const translate: Translate = {
  en: en,
  fr: fr,
}

interface TranslationData {
  common: {
    submit: string
  }
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
  landing: {
    chains: string[]
    callOutBoxText: {
      title: string
      smallText: string
      blueText: string
      description: string
    }[]
    title: string
    subtitle: string
    welcomeText: string
    getStarted: string
    connect: string
    whosNext: string
  }
  feedback: {
    personal: string
    errorText: string
    textAreaPlaceholder: string
    feedbackSubText: string
    feedbackTitle: string
    feedbackShareAltText: string
    thanksSubtext: string
    thanksTitle: string
    heartImageAlt: string
    clickOpen: string
    clickClose: string
  }
  appId: {
    routes: {
      overview: string
      requests: string
      security: string
      notifications: string
    }
  }
  AppRequestsByOriginCard: {
    label: string
    columns: string[]
  }
  AppRequestsErrorsCard: {
    label: string
    columns: string[]
  }
  AppRequestsRateCard: {
    label: string
    list: {
      successDelta: {
        label: string
        help: string
      }
      errorRate: {
        label: string
        help: string
      }
      totalRequests: {
        label: string
      }
    }
  }
  AppOverLimitCard: {
    title: string
    subtitle: string
    body: string[]
    link: string
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
  const user = useUser()
  const language = useMemo(
    () => user.data?.preferences?.language ?? "en",
    [user.data?.preferences],
  )
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
