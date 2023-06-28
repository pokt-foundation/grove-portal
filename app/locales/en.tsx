import { Link } from "@remix-run/react"
import { PayPlanType } from "~/models/portal/sdk"

const schema = {
  common: {
    submit: "submit",
    StopSubscription: "Stop Subscription",
    save: "Save",
    close: "Close",
    goBack: "go back",
    cancel: "Cancel",
    unavailable: "Currently unavailable",
    reset: "Reset",
  },
  search: {
    label: "Search",
    placeholder: "Search by Transaction Hash, Block # and Address",
    emptySearch: "Nothing found.",
    searchBy: "Search by",
  },
  terms: {
    address: "address",
    addresses: "addresses",
    app: "app",
    apps: "apps",
    block: "block",
    blocks: "blocks",
    node: "node",
    nodes: "nodes",
    network: "network",
    networks: "networks",
    rentToOwn: "rent to own",
    support: "support",
    transaction: "transaction",
    transactions: "transactions",
  },
  error: {
    default: "Default Error Message",
    browser: "Browser Error Message",
    server: "Server Error Message",
  },
  landing: {
    chains: [
      "avalanche",
      "solana",
      "algorand",
      "okx",
      "fuse",
      "pokt",
      "ethereum",
      "polygon",
      "gnosis",
      "harmony",
      "binance_smart_chain",
      "iotex",
      "boba",
      "evmos",
      "fantom",
    ],
    callOutBoxText: [
      {
        title: "One click endpoints",
        smallText: "For any supported network",
        blueText: "35+",
        description: "Networks",
      },
      {
        title: "Thousands of nodes",
        smallText: "Serving any network at any given moment",
        blueText: "20K+",
        description: "Nodes",
      },
      {
        title: "Monitor your infra",
        smallText: "Managing your app across any chain",
        blueText: "6B+",
        description: "Weekly relays",
      },
    ],
    title: "Your gateway to Web3 done right.",
    subtitle:
      "Deploy within minutes to decentralized infrastructure that can service dozens of chains. The Portal acts as your one-stop-shop to manage, and monitor your application's connection to blockchain data.",
    welcomeText: "Welcome to Web3 done the right way.",
    getStarted: "Get Started",
    connect: "Connect to these networks.",
    whosNext: "See who's next.",
  },
  feedback: {
    personal: "Do not share any personal info",
    errorText: "Text area must be filled out to submit a suggestion.",
    textAreaPlaceholder: "Would be interesting to...",
    feedbackSubText: "Help us to improve Pocket Portal",
    feedbackTitle: "Share Feedback",
    feedbackShareAltText: "share feedback",
    thanksSubtext: "For your feedback!",
    thanksTitle: "Thanks",
    heartImageAlt: "heart image",
    clickOpen: "Click to open feedback box",
    clickClose: "Click to close feedback box",
    discordAriaLabel: "Click to share feedback with the Pokt Team in discord",
  },
  dashboard: {
    routes: {
      network: "Network",
      apps: "Apps",
      docs: "Docs",
      discord: "Discord",
    },
  },
  appId: {
    routes: {
      overview: "Overview",
      requests: "Requests",
      security: "Security",
      notifications: "Notifications",
      plan: "Plan Details",
      team: "Team",
      settings: "Settings",
    },
  },
  AppRequestsByOriginCard: {
    label: "Requests By Origin",
    columns: ["Percent", "Origin", "Relays"],
  },
  AppRequestsErrorsCard: {
    label: "Requests Errors",
    columns: ["Type", "Message", "Node", "Size", "Date"],
  },
  AppRequestsRateCard: {
    label: "Requests Rate",
    list: {
      successDelta: {
        label: "Success Delta",
        help: "Percentage of success among the total requests attempted by the application during a 24hr period.",
      },
      errorRate: {
        label: "Error Rate",
        help: "Percentage of errors among the total request attempted by the application during a 24hr period.",
      },
      totalRequests: {
        label: "Total Requests",
      },
    },
  },
  AppUsageCurrentCard: {
    label: "Daily Usage",
    list: {
      avgRelays: {
        label: "Average Relays",
        help: "Average number of requests per day sent over the last 7 days.",
      },
      dailyRelays: {
        label: "Daily Relays",
        help: "Total number of requests sent during the current 24hr period.",
      },
      maxRelays: {
        label: "Max Relays",
        help: "Maximum number of requests this application can send during a 24hr period.",
      },
    },
  },
  AppPlanOverviewCard: {
    title: "Plan",
    subscription: "Subscription",
    status: "Status",
    role: "Role",
    date: "Start Date",
    managePlan: "Manage in Stripe",
    currentPlan: "Current Plan",
  },
  AppPlanLatestInvoiceCard: {
    title: "Current period",
    invoice: "Invoice",
    status: "Status",
    relaysBilled: "Relays Billed",
    relaysUsed: "Total Relays of the current period",
    dateStart: "Start",
    dateEnd: "End",
    download: "Download",
    view: "View in Stripe",
    viewRelayData: "View Relay Data",
  },
  AppOverLimitCard: {
    title: "Session Limit Reached",
    subtitle: "It's time to up your stake, your app is over the session limit",
    body: [
      "Don't worry, we've got you covered. To maintain service, the Portal automatically redirects all surplus relays to our backup infrastructure. If you want all relays to be served by Pocket Network, you'll need to stake more POKT.",
      "Please contact the team for further assistance.",
    ],
    link: "Contact POKT Team",
  },
  appAddressCard: {
    heading: "App Address",
    error: "No apps found.",
  },
  footer: {
    termsOfUse: "Site Terms of Use",
    privacyPolicy: "Privacy Policy",
  },
  AppPlansOverview: {
    planDetailsTitles: {
      pricing: "Pricing",
      relayLimit: "Relay Limit",
      chainAccess: "Chain Access",
      appsLimit: "Apps Limit",
      overviewHeader: "Flexible plans that grow with your app",
      enterpriseSolutions: "We have Enterprise Solutions for you",
    },
    planDetails: {
      [PayPlanType.PayAsYouGoV0]: {
        title: "Pay As You Go",
        description:
          "250k free relays per day, per app. Beyond that, pay only for what you use. The counter resets every 24h but you’ll only get billed monthly. Even better, after 24 months of paid relays, you’ll receive POKT to stake for continued service. No more payments.",
        description2: "No more sunk costs. Just fast, reliable infrastructure.",
        pricing: "Pay per relay + 250K Free Relays",
        relayLimit: "No limit",
        appsLimit: "Up to 2 Applicaitions",
        chainAccess: "No limit",
      },
      [PayPlanType.FreetierV0]: {
        title: "Always Free",
        description:
          "Access to reliable, fast infrastructure. Free up to 250k relays per day.",
        description2: "",
        pricing: "$0.00",
        relayLimit: "250k per app per day",
        appsLimit: "Up to 2 Applicaitions",
        chainAccess: "No limit",
      },
      [PayPlanType.TestPlanV0]: {
        title: "Always Free",
        description:
          "Access to reliable, fast infrastructure. Free up to 250k relays per day.",
        description2: "",
        pricing: "$0.00",
        relayLimit: "250k per app per day",
        appsLimit: "Up to 2 Applicaitions",
        chainAccess: "No limit",
      },
      [PayPlanType.Enterprise]: {
        title: "Enterprise",
        description: "Custom plans for large scale apps.",
        description2: "",
        pricing: "Contact Us",
        relayLimit: "",
        appsLimit: "",
        chainAccess: "",
      },
      enterpriseSolutions: {
        description: "Custom plans for large scale apps.",
        contactUS: "Contact Us",
      },
    },
  },
  AppPlanDetails: {
    relayLimit: "Relay Limit",
    relaysPerDay: "relays per day",
    currentPlan: "Current Plan",
    currentPlanToolTip: "This is the current plan for this specific application.",
    upgrade: 'Upgrade to "Pay As You Go"',
    renew: "Renew Subscription",
  },
  PlanView: {
    title: "Stripe Error",
    description:
      "We are sorry but there appears to be an issue with out connection to stripe. You can try managing your subscription directly in Stripe's portal.",
    button: "Manage Plan in Stripe",
  },
  ContactSalesView: {
    title: "We're ready to help",
    description:
      "Give us some basic information and our solutions team will reach out soon.",
    formSubmitted: "Form Submitted",
    formSubmittedDescription:
      "Your form has been successfully submitted. We will be in touch!",
    done: "Done",
    formSubmissionFailed: "Form Submission Failed",
  },
  ContactSalesForm: {
    submitting: "Submitting",
    submit: "Submit",
    firstName: {
      label: "First Name",
      placeholder: "Enter your name",
    },
    lastName: {
      label: "Last Name",
      placeholder: "Enter your last name",
    },
    email: {
      label: "Email",
      placeholder: "Enter your email",
    },
    company: {
      label: "Company",
      placeholder: "Enter a company name",
    },
    chains: {
      label: "Protocol/Chains of interest",
      placeholder: "I'm interested in...",
    },
    relays: {
      label: "Daily Relay Needs",
      placeholder: "Approximately how many daily relays does your app need?",
    },
    tellUsMore: {
      label: "Tell us more about what you are building",
      placeholder: "I'm building...",
    },
  },
  CalculateYourPricing: {
    title: "Calculate your pricing",
    firstDescription:
      "Use the calculator below to give you an estimate of what your monthly bill could look like.",
    secondDescription:
      "Enter the number of relays you think your app might consume in a day. Don’t exclude the free relays. We will do the math for you.",
    avgRelaysPerDay: "AVG Relays per Day",
    pricePerRelay: "Price per Relay",
    totalMonthlyPrice: "Total Monthly Estimated Price",
    howIsThisCalculated: "How is this calculated?",
    modalTitle: "How is this price calculated",
    modalDescription:
      "This formula is how Pocket portal calculates and charge you app relays monthly.",
    totalDailyRelays: "Total daily relays",
    freeRelays: "free relays",
    costPerDay: "Cost per day",
    done: "Done",
    sumPerDay: "The sum of each cost per day",
    monthlyFee: "Monthly fee",
  },
  security: {
    headings: {
      secretKey: "Private Secret Key",
      approvedChains: "Approved Chains",
      userAgents: "Whitelist User-Agents",
      origins: "Whitelist Origins",
      contracts: "Whitelist Contracts",
      methods: "Whitelist Methods",
    },
    secretSwitchAria: "Private Secret Key",
    userAgentPlaceholder: "Type the user-agent here",
    userAgentAria: "Add user-agents to the whitelist",
    defaultSelectChainText: "Select Chain",
    chainsDropdownAria: "Select a chain to add to the whitelist",
    OriginPlaceholder: "Type the origin here",
    OriginAria: "Add origins to the whitelist",
    contractAria: "Add contract selections to the whitelist",
    contractError:
      "You must select a chain and have a value to add to the methods whitelist.",
    contractPlaceholder: "Type the contract address here",
    methodAria: "Add method selections to the whitelist",
    methodError:
      "You must select a chain and have a value to add to the methods whitelist.",
    methodPlaceholder: "Type the method here",
    secretKeyText:
      "To maximize the security of your application, you should activate the private secret key for all requests and enable the use of whitelisted user-agents and origins.",
    approvedChainsText: "Limits the Endpoints to be used only with specific chains.",
    whitelistUserAgentsText:
      "Limits requests to only the HTTP User-Agents specified. If nothing is specified, all User-Agents will be accepted.",
    whitelistOriginsText: "Limits requests to only the HTTP Origins specified.",
    whitelistContractsText: "Limits requests to the smart contract addresses specified.",
    whitelistMethodsText: "Limits requests to use specific RPC methods.",
  },
  stopRemoveApp: {
    stopSubscriptionTitle: "Stop Subscription",
    removeApp: "Delete Application",
    removeAppTitle: "Do you want to delete this application?",
    removeAppDescription:
      "If you delete this application, the data will no longer be accessible in the portal. Historical data will be available in the explorer.",
    planDowngrade:
      "Your plan will be changed to 'Always Free' effective immediatly, and you will be invoiced at the end of your billing period.",
    planRenew:
      "If you change your mind, you can renew your subscription until the end of your billing period.",
    appAddress: "App Address:",
    name: "Name:",
  },
  LegacyBannerCard: {
    title: "Free Tier is about to change",
    body: [
      "On September 27th our unlimited free tier plan is coming to an end. All Free-tier applications will be rate limited at 250K relays per day.",
      "As an early customer, we've got you covered. You will be grandfathered into a legacy free tier plan for a limited time which will grant your app uniterupted service.",
      <>
        For more information
        <a
          className="pokt-link"
          href="mailto:sales@pokt.network"
          rel="noreferrer"
          target="_blank"
        >
          {" "}
          contact us{" "}
        </a>
        with any questions.
      </>,
    ],
    showButtonText: "Minimize",
    hideButtonText: "Learn More",
  },
  BannerErrorCard: {
    title: "Attention: Potential Issues with Data",
    body: [
      "We're experiencing some technical issues right now and the data on this page may be inaccurate. We are working through this as quickly as we can.",
      <>
        Please write to us on
        <Link
          className="pokt-link"
          rel="noreferrer"
          target="_blank"
          to="https://discord.gg/portal-rpc"
        >
          {" "}
          Discord{" "}
        </Link>{" "}
        if you need further assistance.
      </>,
      "If you recently created this app and have not run any relays yet, please disregard this message.",
    ],
  },
}

export default schema
