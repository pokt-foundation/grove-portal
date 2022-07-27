const schema = {
  common: {
    submit: "submit -fr",
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
    subtitle: "FAQ",
    faqs: [
      {
        question: "What is the Pocket Portal?",
        answer:
          "The Pocket Portal is a dashboard for creating and monitoring blockchain infrastructure endpoint(s) powered by Pocket Network's decentralized full-node network.",
      },
      {
        question: "How can this be free?",
        answer:
          "The Pocket Network provides bandwidth to decentralized applications that stake POKT. For the Pocket Portal's free tier, the Pocket Network Foundation has pre-staked POKT on behalf of anyone who signs up for up to 1M relays per day.",
      },
      {
        question: "How long can I use the free option?",
        answer:
          "Currently, the Foundation is operating with \"good faith\" guidelines, meaning that as long as you are actually using the service as intended, you can use the free tier for as long as you'd like. If we notice there is little to no traffic coming through those endpoints, we will reach out directly to see if we can support you. It's important to note there is a finite supply of POKT available for the free tier subsidies, so our goal is to allocate this to developers who truly want to use and improve the service and grow their user base. If you are not using the service, and remain unresponsive to our support outreach, we reserve the right to withdraw the endpoint in order to reallocate it to another development team.",
      },
      {
        question: "What happens if I go over my daily relay limit?",
        answer:
          "The Pocket Portal has overflow protection in case an app accidentally goes over its daily relay limit. All surplus relays are served by our backup infrastructure, ensuring no service interruptions. This is only a temporary measure so you should reach out to our team if you need more relays.",
      },
      {
        question: "Which blockchains can I connect to?",
        answer:
          "The Pocket Portal currently supports creating an endpoint for 10+ chains, including Ethereum, xDAI, Binance Smart Chain, Avalanche, Fuse, and more. You can find the full list here. If you would like to discuss or help decide which networks to include next, join us in Discord.",
      },
      {
        question:
          "What blockchains are available to connect to? Which are planned to come next?",
        answer:
          'The Pocket Portal currently supports creating an endpoint for 10+ chains, including Ethereum, Binance Smart Chain, Avalanche, Polygon, Fuse, and more. You can find the full list here. In that list, you will see a section titled "Integrating New Relay Chains," which is where you can find the networks that are confirmed to be whitelisted next. If you would like to discuss or help decide which networks are not already on that list to include next, we recommend you chat with us in discord and cement your perspective by creating a Pocket forum proposal.',
      },
      {
        question: "How many endpoints can I create?",
        answer:
          "The Pocket Portal currently allows any user to create up to 4 endpoints. Each endpoint can be used to serve 1 blockchain. Each endpoint grants up to 1 million free relays per day. If you need more relays or want to stake your own POKT, join us in Discord and let us know.",
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
        blueText: "47K+",
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
  appId: {
    routes: {
      overview: "Overview -fr",
      requests: "Requests -fr",
      security: "Security -fr",
      notifications: "Notifications -fr",
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
      sessionRelays: {
        label: "Session Relays -fr",
        help: "Total number of request sent during the current network session, each session has 4 blocks, 15 min each, 1 hour total. -fr",
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
  AppOverLimitCard: {
    title: "Session Limit Reached -fr",
    subtitle: "It's time to up your stake, your app is over the session limit -fr",
    body: [
      "Don't worry, we've got you covered. To maintain service, the Portal automatically redirects all surplus relays to our backup infrastructure. If you want all relays to be served by Pocket Network, you'll need to stake more POKT. -fr",
      "Please contact the team for further assistance. -fr",
    ],
    link: "Contact POKT Team -fr",
  },
  footer: {
    termsOfUse: "Site Terms of Use -fr",
    privacyPolicy: "Privacy Policy -fr",
  },
}

export default schema
