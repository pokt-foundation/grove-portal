import { Link } from "@remix-run/react"
import { PayPlanType } from "~/models/portal/sdk"
import { FREE_TIER_MAX_RELAYS } from "~/utils/pocketUtils"

const schema = {
  common: {
    submit: "submit -fr",
    StopSubscription: "Stop Subscription -fr",
    save: "save -fr",
    close: "close -fr",
    goBack: "go back -fr",
    cancel: "Cancel -fr",
    unavailable: "Currently unavailable -fr",
  },
  search: {
    label: "Search -fr",
    placeholder: "Search by Transaction Hash, Block # and Address -fr",
  },
  terms: {
    address: "address -fr",
    addresses: "addresses -fr",
    app: "app -fr",
    apps: "apps -fr",
    block: "block -fr",
    blocks: "blocks -fr",
    node: "node -fr",
    nodes: "nodes -fr",
    network: "network -fr",
    networks: "networks -fr",
    rentToOwn: "rent to own -fr",
    support: "support -fr",
    transaction: "transaction -fr",
    transactions: "transactions -fr",
  },
  error: {
    default: "FrDefault Error Message",
    browser: "FrBrowser Error Message",
    server: "FrServer Error Message",
  },
  faq: {
    title: "Pocket Portal",
    subtitle: "FAQs",
    faqs: [
      {
        question: "What is the Pocket Portal -fr?",
        answer:
          'The Pocket Portal is a browser-based interface where developers can create ("mint") a Pocket endpoint for use in their applications, utilizing a generous free tier of relays and scaling up as needed. Portal users can also monitor network performance.',
      },
      {
        question: "Which blockchains can I connect to? -fr",
        answer: (
          <>
            The Pocket Portal currently supports creating an endpoint for dozens of
            chains, including Ethereum, Harmony, Binance Smart Chain, Avalanche, Fuse, and{" "}
            <a href="https://docs.pokt.network/supported-blockchains/">many more</a>.
          </>
        ),
      },
      {
        question: "How can this be free? -fr",
        answer: `The Pocket Network provides bandwidth to decentralized applications that stake POKT. For the Pocket Portal's free tier, the Pocket Network Foundation has staked POKT on behalf of anyone who signs up to the Portal for up to ${FREE_TIER_MAX_RELAYS.toLocaleString(
          "en-US",
        )} relays per day.`,
      },
      {
        question: "How many endpoints can I create? -fr",
        answer:
          "The Pocket Portal currently allows a user to create blockchain-specific endpoints for any chain served via the Portal. These endpoints can each be monitored as a single Application allowing for cross-chain analytics.",
      },
      {
        question: "What’s the difference between an Application and an Endpoint? -fr",
        answer:
          "The Portal organizes relay traffic through Applications, which are collections of relay traffic. An Application can consist of one or more endpoints, which are URLs that can receive RPC requests to a blockchain. A Portal account can contain multiple Applications, which can in turn contain multiple endpoints.",
      },
      {
        question: "How long can I use the free option? -fr",
        answer: `Currently, the Foundation is operating with "good faith" guidelines, meaning that as long as you are actually using the service as intended, you can use the free tier for as long as you'd like. Our goal is to allocate this to developers who truly want to use and improve the service and grow their user base, so if you are not using the service, we reserve the right to withdraw the endpoint in order to reallocate it to another development team.`,
      },
      {
        question: "What happens if I go over my daily relay limit? -fr",
        answer: (
          <>
            The Pocket Portal has overflow protection in case an app accidentally goes
            over its daily relay limit. All surplus relays are served by our backup
            infrastructure, ensuring no service interruptions. This is only a temporary
            measure so you should{" "}
            <a href="https://discord.gg/pokt">reach out to our team</a> if you need more
            relays.
          </>
        ),
      },
      {
        question: "How can I get [blockchain] added to the Portal? -fr",
        answer: (
          <>
            Pocket Network is expandable, and is continually adding support for new
            chains. Community members can advocate for chains to be considered by{" "}
            <a href="https://discord.gg/pokt">reaching out on Discord</a> and posting a
            suggestion to our team.
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
        title: "One click Endpoints -fr",
        smallText: "For any network with 1M daily relays free -fr",
        blueText: "10+",
        description: "Networks -fr",
      },
      {
        title: "Thousands of nodes -fr",
        smallText: "Serving any network at any given moment -fr",
        blueText: "20K+",
        description: "Nodes -fr",
      },
      {
        title: "Monitor your Infra -fr",
        smallText: "Tracking and managing your app across any chain -fr",
        blueText: "6B+",
        description: "Weekly relays -fr",
      },
    ],
    title: "Your gateway to Web3 done right. -fr",
    subtitle:
      "Deploy within minutes to decentralized infrastructure that can service dozens of chains. The Portal acts as your one-stop-shop to manage, make changes, and monitor your application's connection to blockchain data. -fr",
    welcomeText: "Welcome to Web3 done the right way. -fr",
    getStarted: "Get Started -fr",
    connect: "Connect to these networks. -fr",
    whosNext: "See who's next. -fr",
  },
  feedback: {
    personal: "Do not share any personal info -fr",
    errorText: "Text area must be filled out to submit a suggestion. -fr",
    textAreaPlaceholder: "Would be interesting to... -fr",
    feedbackSubText: "Help us to improve Pocket Portal -fr",
    feedbackTitle: "Share Feedback -fr",
    feedbackShareAltText: "share feedback -fr",
    thanksSubtext: "For your feedback! -fr",
    thanksTitle: "Thanks -fr",
    heartImageAlt: "heart image -fr",
    clickOpen: "Click to open feedback box -fr",
    clickClose: "Click to close feedback box -fr",
  },
  dashboard: {
    routes: {
      network: "Network -fr",
      apps: "Apps -fr",
      docs: "Docs -fr",
      discord: "Discord -fr",
    },
  },
  appId: {
    routes: {
      overview: "Overview -fr",
      requests: "Requests -fr",
      security: "Security -fr",
      notifications: "Notifications -fr",
      plan: "Plan Details -fr",
    },
  },
  AppRequestsByOriginCard: {
    label: "Requests By Origin -fr",
    columns: ["Percent -fr", "Origin -fr", "Relays -fr"],
  },
  AppRequestsErrorsCard: {
    label: "Requests Errors -fr",
    columns: ["Type -fr", "Message -fr", "Node -fr", "Size -fr", "Date -fr"],
  },
  AppRequestsRateCard: {
    label: "Requests Rate -fr",
    list: {
      successDelta: {
        label: "Success Delta -fr",
        help: "Percentage of success among the total request attempted to perform by the application on the last 24h. -fr",
      },
      errorRate: {
        label: "Error Rate -fr",
        help: "Percentage of error among the total request attempted to perform by the application. -fr",
      },
      totalRequests: {
        label: "Total Requests -fr",
      },
    },
  },
  AppUsageCurrentCard: {
    label: "Daily Usage -fr",
    list: {
      avgRelays: {
        label: "Average Relays -fr",
        help: "Average number of requests per day sent over the last 7 days. -fr",
      },
      dailyRelays: {
        label: "Daily Relays -fr",
        help: "Total number of request sent during the current day. -fr",
      },
      maxRelays: {
        label: "Max Relays -fr",
        help: "Maxium number of request this application can send during a single day. -fr",
      },
    },
  },
  AppPlanOverviewCard: {
    title: "Application Plan -fr",
    subscription: "Subscription -fr",
    status: "Status -fr",
    relays: "Total Relays on this Billing Period -fr",
    date: "Start Date -fr",
    managePlan: "Manage Plan in Stripe -fr",
  },
  AppPlanLatestInvoiceCard: {
    title: "Latest Invoice -fr",
    invoice: "Invoice -fr",
    status: "Status -fr",
    relaysBilled: "Relays Billed -fr",
    relaysUsed: "Relays Used -fr",
    dateStart: "Period Start -fr",
    dateEnd: "Period End -fr",
    download: "Download -fr",
    view: "View in Stripe -fr",
  },
  AppOverLimitCard: {
    title: "Session Limit Reached -fr",
    subtitle: "It's time to up your stake, your app is over the session limit -fr",
    body: [
      "Don't worry, we've got you covered. To maintain service, the Portal automatically redirects all surplus relays to our backup infrastructure. If you want all relays to be served by Pocket Network, you'll need to stake more POKT. -fr",
      "Please contact the team for further assistance. -fr",
    ],
    link: "Contact POKT Team -fr",
  },
  appAddressCard: {
    heading: "App Address -fr",
    error: "No apps found. -fr",
  },
  footer: {
    termsOfUse: "Site Terms of Use -fr",
    privacyPolicy: "Privacy Policy -fr",
  },
  AppPlansOverview: {
    planDetailsTitles: {
      pricing: "Pricing -fr",
      relayLimit: "Relay Limit -fr",
      chainAccess: "Chain Access -fr",
      appsLimit: "Apps Limit -fr",
      overviewHeader: "Flexible plans that grow with your app -fr",
      enterpriseSolutions: "We have Enterprise Solutions for you -fr",
    },
    planDetails: {
      [PayPlanType.PayAsYouGoV0]: {
        title: "Pay As You Go -fr",
        description:
          "250k free relays per day, per app. Beyond that, pay only for what you use. The counter resets every 24h but you’ll only get billed monthly. Even better, after 24 months of paid relays, you’ll receive POKT to stake for continued service. No more payments. -fr",
        description2: "No more sunk costs. Just fast, reliable infrastructure. -fr",
        pricing: "Pay per relay + 250K Free Relays -fr",
        relayLimit: "No limit -fr",
        appsLimit: "Up to 2 Applicaitions -fr",
        chainAccess: "No limit -fr",
      },
      [PayPlanType.FreetierV0]: {
        title: "Always Free -fr",
        description:
          "Access to reliable, fast infrastructure. Free up to 250k relays per day. -fr",
        description2: "",
        pricing: "$0.00 -fr",
        relayLimit: "250k per app per day -fr",
        appsLimit: "Up to 2 Applicaitions -fr",
        chainAccess: "No limit -fr",
      },
      [PayPlanType.TestPlanV0]: {
        title: "Always Free -fr",
        description:
          "Access to reliable, fast infrastructure. Free up to 250k relays per day. -fr",
        description2: "",
        pricing: "$0.00 -fr",
        relayLimit: "250k per app per day -fr",
        appsLimit: "Up to 2 Applicaitions -fr",
        chainAccess: "No limit -fr",
      },
      [PayPlanType.Enterprise]: {
        title: "Enterprise -fr",
        description: "Custom plans for large scale apps. -fr",
        description2: "",
        pricing: "Contact Us -fr",
        relayLimit: "",
        appsLimit: "",
        chainAccess: "",
      },
      enterpriseSolutions: {
        description: "Custom plans for large scale apps. -fr",
        contactUS: "Contact Us -fr",
      },
    },
  },
  AppPlanDetails: {
    relayLimit: "Relays Limit -fr",
    relaysPerDay: "relays per day -fr",
    currentPlan: "Current Plan -fr",
    currentPlanToolTip: "This is the current plan for this specific application. -fr",
    upgrade: "Upgrade to Pay As You Go -fr",
    renew: "Renew Subscription -fr",
  },
  PlanView: {
    title: "Stripe Error -fr",
    description:
      "We are sorry but there appears to be an issue with out connection to stripe. You can try managing your subscription directly in Stripe's portal. -fr",
    button: "Manage Plan in Stripe -fr",
  },
  ContactSalesView: {
    title: "We're ready to help -fr",
    description:
      "Give us some basic information of your request and our solutions team will reach out soon to find the best way of service your application. -fr",
    formSubmitted: "Form Submitted -fr",
    formSubmittedDescription:
      "Your form has been successfully submitted. We will be in touch! -fr",
    done: "Done -fr",
    formSubmissionFailed: "Form Submission Failed -fr",
  },
  ContactSalesForm: {
    submitting: "Submitting -fr",
    submit: "Submit -fr",
    firstName: {
      label: "First Name -fr",
      placeholder: "Enter your name -fr",
    },
    lastName: {
      label: "Last Name -fr",
      placeholder: "Enter your last name -fr",
    },
    email: {
      label: "Email -fr",
      placeholder: "Enter your email -fr",
    },
    company: {
      label: "Company -fr",
      placeholder: "Enter a company name -fr",
    },
    chains: {
      label: "Protocol/Chains of interest -fr",
      placeholder: "I'm interested in chain... -fr",
    },
    relays: {
      label: "Relay Needs -fr",
      placeholder: "How many daily relays your application request -fr",
    },
    tellUsMore: {
      label: "Tell us more about what you are building -fr",
      placeholder: "I'm building a Chain... -fr",
    },
  },
  CalculateYourPricing: {
    title: "Calculate your pricing -fr",
    firstDescription:
      "Use the calculator below to give you an estimate of what your monthly bill could look like. -fr",
    secondDescription:
      "Enter the number of relays you think your app might consume in a day. Don’t exclude the free relays. We will do the math for you. -fr",
    avgRelaysPerDay: "AVG Relays per Day -fr",
    pricePerRelay: "Price per Relay -fr",
    totalMonthlyPrice: "Total Monthly Estimated Price -fr",
    howIsThisCalculated: "How is this calculated? -fr",
    modalTitle: "How is this price calculated -fr",
    modalDescription:
      "This formula is how Pocket portal calculates and charge you app relays monthly. If you want to learn more see our -fr",
    secondModalDescription: "documentation -fr",
    totalDailyRelays: "Total daily relays -fr",
    freeRelays: "free relays -fr",
    costPerDay: "Cost per day -fr",
    done: "Done -fr",
    sumPerDay: "The sum of each cost per day -fr",
    monthlyFee: "Monthly fee -fr",
  },
  security: {
    headings: {
      secretKey: "Private Secret Key Required -fr",
      approvedChains: "Approved Chains -fr",
      userAgents: "Whitelist User-Agents -fr",
      origins: "Whitelist Origins -fr",
      contracts: "Whitelist Contracts -fr",
      methods: "Whitelist Methods -fr",
    },
    secretSwitchAria: "Private key required -fr",
    userAgentPlaceholder: "Type user agent here -fr",
    userAgentAria: "Add user agents to white list -fr",
    defaultSelectChainText: "Select Chain -fr",
    chainsDropdownAria: "Select a chain to add to white list -fr",
    OriginPlaceholder: "Type origin here -fr",
    OriginAria: "Add origins to white list -fr",
    contractAria: "Add contract selections to white list -fr",
    contractError:
      "You must select a chain and have a value to add to methods whitelist. -fr",
    methodAria: "Add method selections to white list -fr",
    methodError:
      "You must select a chain and have a value to add to methods whitelist. -fr",
    secretKeyText:
      "To maximize the security of your application, you should activate the private secret key for all requests and enable the use of whitelist user agents and origins. -fr",
  },
  stopRemoveApp: {
    stopSubscriptionTitle: "This will stop your subscription! -fr",
    removeApp: "Remove Application -fr",
    removeAppTitle: "You're about to remove this application! -fr",
    removeAppDescription:
      "If you delete this application, the data will no longer be accessible in the portal. Historical data will be available in the explorer. -fr",
    planDowngrade:
      "Your plan will be canceled, but is still available until the end of your billing period. -fr",
    appAddress: "App Address: -fr",
    name: "Name: -fr",
    planRenew: "If you change your mind, you can renew your subscription. -fr",
  },
  LegacyBannerCard: {
    title: "Free Tier is about to change -fr",
    body: [
      "On September 27th our unlimited free tier plan is coming to an end. All Free-tier applications will be rate limited at 250K relays per day. -fr",
      "As an early customer, we've got you covered. You will be grandfathered into a legacy free tier plan for a limited time which will grant your app uniterupted service. -fr",
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
        with any questions. -fr
      </>,
    ],
    showButtonText: "Minimize -fr",
    hideButtonText: "Learn More -fr",
  },
  BannerErrorCard: {
    title: "Attention: Potential Issues with Data",
    body: [
      "We're experiencing some technical issues right now and the data on this page may be inaccurate. We are working through this as quickly as we can. -fr",
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
        if you need further assistance. -fr
      </>,
      "If you recently created this app and have not run any relays yet, please disregard this message. -fr",
    ],
  },
}

export default schema
