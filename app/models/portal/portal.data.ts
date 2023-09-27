import {
  AppStatus,
  Blockchain,
  PayPlanType,
  PortalApp,
  ProcessedEndpoint,
  RoleName,
  User,
} from "./sdk"

const testEmail = "test@test.test"
export const testPortalUserId = "userId_test"

// @ts-ignore
export const app: PortalApp = {
  id: "c7ec4cdcb4e28a19972da585",
  name: "Test Application",
  accountID: "2886d942",
  settings: {
    // @ts-ignore
    environment: "production",
    secretKey: "secretKey",
    secretKeyRequired: false,
    favoritedBlockchainIDs: null,
    monthlyRelayLimit: 0,
  },
  // @ts-ignore
  whitelists: {},
  aat: {
    a4bad02a5c85e04d843fbde4: {
      id: "id",
      publicKey: "publicKey",
      address: "address",
      clientPublicKey: "clientPublicKey",
      signature: "signature",
      version: "0.0.1",
    },
  },
  notifications: {
    // @ts-ignore
    email: {
      type: "email",
      active: true,
      destination: "",
      trigger: "",
      events: {
        full: true,
        signedUp: true,
        threeQuarters: true,
      },
    },
  },
  createdAt: "2023-04-26T16:31:21.823638Z",
  updatedAt: "2023-04-26T16:31:21.823638Z",
  deleted: false,
  firstDateSurpassed: "0001-01-01T00:00:00Z",
  legacyFields: {
    // @ts-ignore
    planType: "FREETIER_V0",
    dailyLimit: 250000,
    customLimit: 0,
    requestTimeout: 2000,
  },
}

export const endpoint: ProcessedEndpoint = {
  appLimits: {
    dailyLimit: 0,
    planType: PayPlanType.PayAsYouGoV0,
    publicKey: "",
  },
  apps: [
    {
      address: "4523ea5b5bbdc7ec6ef6fd3fe2f5fd209ce244d6",
      appId: "265e612136ee5986f3f45e65",
      chain: "0001",
      publicKey: "919046f41dcbee7ff8d98f754e971f30efa9d78733d6582fca553deab511d05c",
      unstakingTime: null,
      stake: 0,
      stakedTokens: null,
      status: null,
      jailed: null,
    },
  ],
  createdAt: "2022-08-22 15:55:11.288272 +0000 UTC",
  gatewaySettings: {
    secretKey: "6f870bb75a1547c2bbbdb4cfa3efb2e5",
    secretKeyRequired: false,
    whitelistBlockchains: [],
    whitelistContracts: [],
    whitelistMethods: [],
    whitelistOrigins: [],
    whitelistUserAgents: [],
  },
  gigastake: true,
  id: "f3cbb43cc8a0c93b291d3627",
  name: "Subscription 6",
  notificationSettings: {
    full: true,
    half: false,
    quarter: false,
    signedUp: true,
    threeQuarters: true,
  },
  status: AppStatus.InService,
  updatedAt: "2022-08-22 15:55:11.288274 +0000 UTC",
  userId: "62fd1d49a6eba977fd212c23",
  applications: [],
  users: [
    {
      accepted: true,
      email: testEmail,
      roleName: RoleName.Admin,
      userID: testPortalUserId,
    },
  ],
  integrations: {
    covalentAPIKeyFree: "",
    covalentAPIKeyPaid: "",
  },
}

export const blockchains: Blockchain[] = [
  {
    id: "0002",
    ticker: "BTC",
    description: "Bitcoin",
    blockchain: "btc-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 0,
    path: "",
    blockchainAliases: ["btc-mainnet"],
  },
  {
    id: "0027",
    ticker: "GNO",
    description: "Gnosis Chain Mainnet",
    blockchain: "poa-xdai",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 100000000,
    path: "",
    blockchainAliases: ["poa-xdai", "gnosischain-mainnet"],
  },
  {
    id: "0004",
    ticker: "BSC",
    description: "Binance Smart Chain",
    blockchain: "bsc-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["bsc-mainnet"],
  },
  {
    id: "0021",
    ticker: "ETH",
    description: "Ethereum Mainnet",
    blockchain: "eth-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["eth-mainnet"],
  },
  {
    id: "0022",
    ticker: "ETH",
    description: "Ethereum Mainnet Archival",
    blockchain: "eth-archival",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 500000,
    path: "",
    blockchainAliases: ["eth-archival"],
  },
  {
    id: "0044",
    ticker: "IOT",
    description: "IoTeX Mainnet",
    blockchain: "iotex-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["iotex-mainnet"],
  },
  {
    id: "0025",
    ticker: "ETH",
    description: "Rinkeby",
    blockchain: "eth-rinkeby",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["eth-rinkeby"],
  },
  {
    id: "0009",
    ticker: "POLY",
    description: "Polygon Matic",
    blockchain: "poly-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["poly-mainnet", "poly-rpc"],
  },
  {
    id: "0001",
    ticker: "POKT",
    description: "Pocket Network Mainnet",
    blockchain: "mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 0,
    path: "/v1/query/height",
    blockchainAliases: ["mainnet"],
  },
  {
    id: "000B",
    ticker: "POLY",
    description: "Polygon Matic Archival",
    blockchain: "poly-archival",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["poly-archival"],
  },
  {
    id: "0046",
    ticker: "EVM",
    description: "Evmos Mainnet",
    blockchain: "evmos-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["evmos-mainnet"],
  },
  {
    id: "0040",
    ticker: "HMY",
    description: "Harmony Shard 0",
    blockchain: "harmony-0",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"hmy_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 0,
    path: "",
    blockchainAliases: ["harmony-0"],
  },
  {
    id: "0010",
    ticker: "BSC",
    description: "Binance Smart Chain (Archival)",
    blockchain: "bsc-archival",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["bsc-archival"],
  },
  {
    id: "00A3",
    ticker: "AVAX",
    description: "AVAX Archival",
    blockchain: "avax-archival",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 1000000,
    path: "/ext/bc/C/rpc",
    blockchainAliases: ["avax-archival"],
  },
  {
    id: "0003",
    ticker: "AVAX",
    description: "AVAX",
    blockchain: "avax-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 100000,
    path: "/ext/bc/C/rpc",
    blockchainAliases: ["avax-mainnet"],
  },
  {
    id: "0029",
    ticker: "Algo",
    description: "Algorand Mainnet",
    blockchain: "algo-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 1000000,
    path: "",
    blockchainAliases: ["algo-mainnet"],
  },
  {
    id: "0024",
    ticker: "POA",
    description: "Kovan",
    blockchain: "poa-kovan",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["poa-kovan", "eth-kovan"],
  },
  {
    id: "000A",
    ticker: "FUSE",
    description: "Fuse Archival",
    blockchain: "fuse-archival",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["fuse-archival"],
  },
  {
    id: "0026",
    ticker: "ETH",
    description: "Goerli",
    blockchain: "eth-goerli",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["eth-goerli"],
  },
  {
    id: "000D",
    ticker: "Algo",
    description: "Algorand Archival",
    blockchain: "algo-archival",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 1000000,
    path: "",
    blockchainAliases: ["algo-archival"],
  },
  {
    id: "0006",
    ticker: "SOL",
    description: "Solana",
    blockchain: "solana-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 0,
    path: "",
    blockchainAliases: ["solana-mainnet"],
  },
  {
    id: "000C",
    ticker: "POA",
    description: "Gnosis Chain Archival",
    blockchain: "poa-xdai-archival",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 500000,
    path: "",
    blockchainAliases: ["poa-xdai-archival", "gnosischain-archival"],
  },
  {
    id: "0028",
    ticker: "ETH",
    description: "Ethereum Mainnet Archival with trace calls",
    blockchain: "eth-trace",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["eth-trace"],
  },
  {
    id: "0023",
    ticker: "ETH",
    description: "Ropsten",
    blockchain: "eth-ropsten",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["eth-ropsten"],
  },
  {
    id: "0047",
    ticker: "OKC",
    description: "OKC Mainnet",
    blockchain: "oKc-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["okc-mainnet", "oec-mainnet"],
  },
  {
    id: "0048",
    ticker: "BOBA",
    description: "BOBA Mainnet",
    blockchain: "boba-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["boba-mainnet"],
  },
  {
    id: "03DF",
    ticker: "AVAX_DFK",
    description: "AVAX_DFK",
    blockchain: "avax-dfk",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 100000,
    path: "/ext/bc/q2aTwKuyzgs8pynF7UXBZCU7DejbZbZ6EUyHr3JQzYgwNPUPi/rpc",
    blockchainAliases: ["avax-dfk"],
  },
  {
    id: "0049",
    ticker: "FTM",
    description: "Fantom Mainnet",
    blockchain: "fantom-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["fantom-mainnet"],
  },
  {
    id: "03CB",
    ticker: "CRA",
    description: "AVAX_CRA",
    blockchain: "avax-cra",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 100000,
    path: "/ext/bc/2K33xS9AyP9oCDiHYKVrHe7F54h2La5D8erpTChaAhdzeSu2RX/rpc",
    blockchainAliases: ["avax-cra"],
  },
  {
    id: "0052",
    ticker: "NEAR",
    description: "NEAR Mainnet",
    blockchain: "near-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["near-mainnet"],
  },
  {
    id: "0050",
    ticker: "GLMR",
    description: "Moonbeam Mainnet",
    blockchain: "moonbeam-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["moonbeam-mainnet"],
  },
  {
    id: "0051",
    ticker: "MOVR",
    description: "Moonriver Mainnet",
    blockchain: "moonriver-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["moonriver-mainnet"],
  },
  {
    id: "0005",
    ticker: "FUSE",
    description: "Fuse",
    blockchain: "fuse-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: '{\\"method\\":\\"eth_chainId\\",\\"id\\":1,\\"jsonrpc\\":\\"2.0\\"}',
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["fuse-mainnet"],
  },
  {
    id: "0053",
    ticker: "OP",
    description: "Optimism Mainnet",
    blockchain: "optimism-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["optimism-mainnet"],
  },
  {
    id: "0054",
    ticker: "OSMO",
    description: "Osmosis Mainnet",
    blockchain: "osmosis-mainnet",
    active: false,
    enforceResult: "",
    chainIDCheck: "",
    logLimitBlocks: 100000,
    path: "",
    blockchainAliases: ["osmosis-mainnet"],
  },
]

export const teamsMockData = [
  {
    id: 0,
    app: "AppA",
    accepted: true,
    roleName: "ADMIN",
  },
  {
    id: 1,
    app: "AppB",
    accepted: true,
    roleName: "MEMBER",
  },
  {
    id: 2,
    app: "AppC",
    accepted: false,
    roleName: "MEMBER",
  },
  {
    id: 3,
    app: "AppD",
    accepted: false,
    roleName: "ADMIN",
  },
  {
    id: 4,
    app: "AppE",
    accepted: false,
    roleName: "ADMIN",
  },
] as const

export const profileMockData: User & { auth0ID: string } = {
  auth0ID: "auth0|230rf40fgj0jf30e",
  portalUserID: "123456",
  email: "user@pokt.network",
  iconURL: "",
  signedUp: false,
  updatesProduct: false,
  updatesMarketing: false,
  betaTester: false,
}
