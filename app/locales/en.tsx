import { Link } from "@remix-run/react"
import { PayPlanType } from "~/models/portal/sdk"
import { FREE_TIER_MAX_RELAYS } from "~/utils/pocketUtils"

const schema = {
  common: {
    submit: "submit",
    StopSubscription: "Stop Subscription",
    save: "Save",
    close: "Close",
    goBack: "go back",
    cancel: "Cancel",
    unavailable: "Currently unavailable",
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
  faq: {
    title: "Pocket Portal",
    subtitle: "FAQs",
    faqs: [
      {
        question: "What is the Pocket Portal?",
        answer:
          'The Pocket Portal is a browser-based interface where developers can create ("mint") a Pocket endpoint for use in their applications, utilizing a generous free tier of relays and scaling up as needed. Portal users can also monitor network performance.',
      },
      {
        question: "Which blockchains can I connect to?",
        answer: (
          <>
            The Pocket Portal currently supports creating an endpoint for dozens of
            chains, including Ethereum, Harmony, Binance Smart Chain, Avalanche, Fuse, and{" "}
            <a
              href="https://docs.pokt.network/supported-blockchains/"
              rel="noreferrer"
              target="_blank"
            >
              many more
            </a>
            .
          </>
        ),
      },
      {
        question: "How can this be free?",
        answer: `The Pocket Network provides bandwidth to decentralized applications that stake POKT. For the Pocket Portal's free tier, the Pocket Network Foundation has staked POKT on behalf of anyone who signs up to the Portal for up to ${FREE_TIER_MAX_RELAYS.toLocaleString(
          "en-US",
        )} relays per day.`,
      },
      {
        question: "How many endpoints can I create?",
        answer:
          "The Pocket Portal currently allows a user to create blockchain-specific endpoints for any chain served via the Portal. These endpoints can each be monitored as a single Application allowing for cross-chain analytics.",
      },
      {
        question: "What’s the difference between an Application and an Endpoint?",
        answer:
          "The Portal organizes relay traffic through Applications, which are collections of relay traffic. An Application can consist of one or more endpoints, which are URLs that can receive RPC requests to a blockchain. A Portal account can contain multiple Applications, which can in turn contain multiple endpoints.",
      },
      {
        question: "How long can I use the free option?",
        answer: `Currently, the Foundation is operating with "good faith" guidelines, meaning that as long as you are actually using the service as intended, you can use the free tier for as long as you'd like. Our goal is to allocate this to developers who truly want to use and improve the service and grow their user base, so if you are not using the service, we reserve the right to withdraw the endpoint in order to reallocate it to another development team.`,
      },
      {
        question: "What happens if I go over my daily relay limit?",
        answer: (
          <>
            The Pocket Portal has overflow protection in case an app accidentally goes
            over its daily relay limit. All surplus relays are served by our backup
            infrastructure, ensuring no service interruptions. This is only a temporary
            measure so you should{" "}
            <a href="https://discord.gg/pokt" rel="noreferrer" target="_blank">
              reach out to our team
            </a>{" "}
            if you need more relays.
          </>
        ),
      },
      {
        question: "How can I get [blockchain] added to the Portal?",
        answer: (
          <>
            Pocket Network is expandable, and is continually adding support for new
            chains. Community members can advocate for chains to be considered by{" "}
            <a href="https://discord.gg/pokt" rel="noreferrer" target="_blank">
              reaching out on Discord
            </a>{" "}
            and posting a suggestion to our team.
          </>
        ),
      },
    ],
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
    title: "Application Plan",
    subscription: "Subscription",
    status: "Status",
    relays: "Total Relays on this Billing Period",
    date: "Start Date",
    managePlan: "Manage Plan in Stripe",
  },
  AppPlanLatestInvoiceCard: {
    title: "Latest Invoice",
    invoice: "Invoice",
    status: "Status",
    relaysBilled: "Relays Billed",
    relaysUsed: "Relays Used",
    dateStart: "Period Start",
    dateEnd: "Period End",
    download: "Download",
    view: "View in Stripe",
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
      "This formula is how Pocket portal calculates and charge you app relays monthly. If you want to learn more see our",
    secondModalDescription: "documentation",
    totalDailyRelays: "Total daily relays",
    freeRelays: "free relays",
    costPerDay: "Cost per day",
    done: "Done",
    sumPerDay: "The sum of each cost per day",
    monthlyFee: "Monthly fee",
  },
  security: {
    headings: {
      secretKey: "Private Secret Key Required",
      approvedChains: "Approved Chains",
      userAgents: "Whitelist User-Agents",
      origins: "Whitelist Origins",
      contracts: "Whitelist Contracts",
      methods: "Whitelist Methods",
    },
    secretSwitchAria: "Private key required",
    userAgentPlaceholder: "Type user-agent here",
    userAgentAria: "Add user-agents to white list",
    defaultSelectChainText: "Select Chain",
    chainsDropdownAria: "Select a chain to add to white list",
    OriginPlaceholder: "Type origin here",
    OriginAria: "Add origins to white list",
    contractAria: "Add contract selections to white list",
    contractError:
      "You must select a chain and have a value to add to methods whitelist.",
    methodAria: "Add method selections to white list",
    methodError: "You must select a chain and have a value to add to methods whitelist.",
    secretKeyText:
      "To maximize the security of your application, you should activate the private secret key for all requests and enable the use of whitelisted user-agents and origins.",
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
        Please view our
        <Link className="pokt-link" to="/faq">
          {" "}
          FAQs{" "}
        </Link>
        for more information and
        <Link className="pokt-link" to="/contact-sales">
          {" "}
          contact us{" "}
        </Link>
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
          to="https://discord.gg/pokt"
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
