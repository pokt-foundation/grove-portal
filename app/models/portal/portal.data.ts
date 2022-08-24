import { AppStatus, PayPlanType, ProcessedEndpoint } from "./sdk"

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
      publicKey: "919046f41dcbee7ff8d98f754e971f30efa9d78733d6582fca553deab511d05c",
      unstakingTime: null,
      stakedTokens: null,
      status: null,
      jailed: null,
    },
  ],
  chain: "",
  createdAt: "2022-08-22 15:55:11.288272 +0000 UTC",
  freeTier: false,
  gatewaySettings: {
    secretKey: "6f870bb75a1547c2bbbdb4cfa3efb2e5",
    secretKeyRequired: false,
    whitelistBlockchains: null,
    whitelistContracts: null,
    whitelistMethods: null,
    whitelistOrigins: null,
    whitelistUserAgents: null,
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
  stake: 0,
  updatedAt: "2022-08-22 15:55:11.288274 +0000 UTC",
  userId: "62fd1d49a6eba977fd212c23",
}

export const endpoints: ProcessedEndpoint[] = Array(2).fill(endpoint)
