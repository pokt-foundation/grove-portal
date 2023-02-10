import React, { useContext, useMemo } from "react"
import { useUser } from "./UserContext"
import en from "~/locales/en"
import fr from "~/locales/fr"
import { BannerErrorCard } from "~/locales/types/BannerErrorCard"
import { CalculateYourPricing } from "~/locales/types/CalculateYourPricing"
import {
  ContactSalesForm,
  ContactSalesView,
} from "~/locales/types/ContactSalesLocaleTypes"
import { LegacyBannerCard } from "~/locales/types/LegacyBannerCard"
import { SecurityPageViewTypes } from "~/locales/types/SecurityPageTypes"
import { StopRemoveApp } from "~/locales/types/StopRemoveApp"
import { PayPlanType } from "~/models/portal/sdk"

const languages = ["en", "fr"] as const
const translate: Translate = {
  en: en,
  fr: fr,
}

interface TranslationData {
  common: {
    submit: string
    StopSubscription: string
    save: string
    close: string
    goBack: string
    cancel: string
    unavailable: string
  }
  search: {
    label: string
    placeholder: string
    emptySearch: string
    searchBy: string
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
    rentToOwn: string
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
      answer: string | React.ReactNode | JSX.Element
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
  dashboard: {
    routes: {
      network: string
      apps: string
      docs: string
      discord: string
    }
  }
  appId: {
    routes: {
      overview: string
      requests: string
      security: string
      notifications: string
      plan: string
      team: string
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
  AppUsageCurrentCard: {
    label: string
    list: {
      avgRelays: {
        label: string
        help: string
      }
      dailyRelays: {
        label: string
        help: string
      }
      maxRelays: {
        label: string
        help: string
      }
    }
  }
  AppPlanOverviewCard: {
    title: string
    subscription: string
    status: string
    relays: string
    date: string
    managePlan: string
  }
  AppPlanLatestInvoiceCard: {
    title: string
    invoice: string
    status: string
    relaysBilled: string
    relaysUsed: string
    dateStart: string
    dateEnd: string
    download: string
    view: string
  }
  AppOverLimitCard: {
    title: string
    subtitle: string
    body: string[]
    link: string
  }
  appAddressCard: {
    heading: string
    error: string
  }
  footer: {
    termsOfUse: string
    privacyPolicy: string
  }
  AppPlansOverview: {
    planDetailsTitles: {
      pricing: string
      relayLimit: string
      chainAccess: string
      appsLimit: string
      overviewHeader: string
      enterpriseSolutions: string
    }
    planDetails: {
      [PayPlanType.PayAsYouGoV0]: {
        title: string
        description: string
        description2: string
        pricing: string
        relayLimit: string
        appsLimit: string
        chainAccess: string
      }
      [PayPlanType.FreetierV0]: {
        title: string
        description: string
        description2: string
        pricing: string
        relayLimit: string
        appsLimit: string
        chainAccess: string
      }
      [PayPlanType.TestPlanV0]: {
        title: string
        description: string
        description2: string
        pricing: string
        relayLimit: string
        appsLimit: string
        chainAccess: string
      }
      [PayPlanType.Enterprise]: {
        title: string
        description: string
        description2: string
        pricing: string
        relayLimit: string
        appsLimit: string
        chainAccess: string
      }
      enterpriseSolutions: {
        description: string
        contactUS: string
      }
    }
  }
  AppPlanDetails: {
    relayLimit: string
    relaysPerDay: string
    currentPlan: string
    currentPlanToolTip: string
    upgrade: string
    renew: string
  }
  PlanView: {
    title: string
    description: string
    button: string
  }
  ContactSalesView: ContactSalesView
  ContactSalesForm: ContactSalesForm
  CalculateYourPricing: CalculateYourPricing
  security: SecurityPageViewTypes
  stopRemoveApp: StopRemoveApp
  LegacyBannerCard: LegacyBannerCard
  BannerErrorCard: BannerErrorCard
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
