export type ChainMetadata = {
  prefix: string
  name: string
  abbrv: string
  evm: boolean
}

export type Chain = {
  id: string
  ticker: string
  network: string
  description: string
  appCount?: number
  isAvailableForStaking: boolean
}

export const CHAIN_ID_PREFIXES = new Map<string, ChainMetadata>([
  [
    '0001',
    { prefix: 'mainnet', name: 'Pocket Mainnet', abbrv: 'Mainnet', evm: false },
  ],
  [
    '0003',
    {
      prefix: 'avax-mainnet',
      name: 'Avalanche Mainnet',
      abbrv: 'AVAX',
      evm: true,
    },
  ],
  [
    '0005',
    { prefix: 'fuse-mainnet', name: 'Fuse Mainnet', abbrv: 'Fuse', evm: true },
  ],
  [
    '0006',
    {
      prefix: 'solana-mainnet',
      name: 'Solana Mainnet',
      abbrv: 'Solana',
      evm: false,
    },
  ],
  [
    '0009',
    {
      prefix: 'poly-mainnet',
      name: 'Polygon (Matic) Mainnet',
      abbrv: 'Polygon',
      evm: true,
    },
  ],
  [
    '000B',
    {
      prefix: 'poly-archival',
      name: 'Polygon (Matic) Archival',
      abbrv: 'Polygon',
      evm: true,
    },
  ],
  [
    '000C',
    {
      prefix: 'poa-xdai-archival',
      name: 'Gnosis Chain Mainnet (Archival)',
      abbrv: 'Gnosis',
      evm: true,
    },
  ],
  [
    '000D',
    {
      prefix: 'algo-archival',
      name: 'Algorand Mainnet (Archival)',
      abbrv: 'Algorand',
      evm: false,
    },
  ],
  [
    '00A3',
    {
      prefix: 'avax-archival',
      name: 'Avalanche Mainnet (Archival)',
      abbrv: 'AVAX',
      evm: true,
    },
  ],
  [
    '03DF',
    {
      prefix: 'avax-dfk',
      name: 'Avalanche DFK Subnet',
      abbrv: 'DFK',
      evm: true,
    },
  ],
  [
    '03CB',
    {
      prefix: 'avax-cra',
      name: 'Avalanche Crabada Subnet',
      abbrv: 'CRA',
      evm: true,
    },
  ],
  [
    '0021',
    {
      prefix: 'eth-mainnet',
      name: 'Ethereum Mainnet',
      abbrv: 'ETH',
      evm: true,
    },
  ],
  [
    '0022',
    {
      prefix: 'eth-archival',
      name: 'Ethereum Mainnet (Archival)',
      abbrv: 'ETH',
      evm: true,
    },
  ],
  [
    '0023',
    {
      prefix: 'eth-ropsten',
      name: 'Ethereum Ropsten',
      abbrv: 'ETH',
      evm: true,
    },
  ],
  ['0024', { prefix: 'poa-kovan', name: 'Kovan', abbrv: 'Kovan', evm: false }],
  [
    '0025',
    {
      prefix: 'eth-rinkeby',
      name: 'Ethereum Rinkeby',
      abbrv: 'ETH',
      evm: true,
    },
  ],
  [
    '0026',
    { prefix: 'eth-goerli', name: 'Ethereum Goerli', abbrv: 'ETH', evm: true },
  ],
  [
    '0027',
    {
      prefix: 'poa-xdai',
      name: 'Gnosis Chain Mainnet',
      abbrv: 'Gnosis',
      evm: true,
    },
  ],
  [
    '0028',
    {
      prefix: 'eth-trace',
      name: 'Ethereum Mainnet (Trace)',
      abbrv: 'ETH',
      evm: true,
    },
  ],
  [
    '0029',
    {
      prefix: 'algo-mainnet',
      name: 'Algorand Mainnet',
      abbrv: 'Algorand',
      evm: false,
    },
  ],
  [
    '0040',
    {
      prefix: 'harmony-0',
      name: 'Harmony Shard 0',
      abbrv: 'Harmony',
      evm: true,
    },
  ],
  [
    '0044',
    {
      prefix: 'iotex-mainnet',
      name: 'IoTeX Mainnet',
      abbrv: 'IoTeX',
      evm: true,
    },
  ],
  [
    '0046',
    {
      prefix: 'evmos-mainnet',
      name: 'Evmos Mainnet',
      abbrv: 'Evmos',
      evm: true,
    },
  ],
  [
    '0047',
    { prefix: 'oec-mainnet', name: 'OEC Mainnet', abbrv: 'OEC', evm: true },
  ],
  [
    '0048',
    { prefix: 'boba-mainnet', name: 'BOBA Mainnet', abbrv: 'BOBA', evm: true },
  ],
  [
    '0049',
    {
      prefix: 'fantom-mainnet',
      name: 'Fantom Mainnet',
      abbrv: 'FTM',
      evm: true,
    },
  ],
  [
    '0004',
    { prefix: 'bsc-mainnet', name: 'BSC Mainnet', abbrv: 'BSC', evm: true },
  ],
  [
    '0052',
    { prefix: 'near-mainnet', name: 'NEAR Mainnet', abbrv: 'NEAR', evm: true },
  ],
])

export const PRODUCTION_CHAINS = [
  '0001',
  '0003',
  '03DF',
  '03CB',
  '0004',
  '0005',
  '0009',
  '000B',
  '000C',
  '0021',
  '0022',
  '0023',
  '0025',
  '0026',
  '0027',
  '0028',
  '0040',
  '0047',
  '0048',
  '0049',
  '0052',
]
export const ALPHA_CHAINS: string[] = []

export function prefixFromChainId(chainId: string): ChainMetadata | undefined {
  return CHAIN_ID_PREFIXES.get(chainId)
}

export function getServiceLevelByChain(
  chainId: string
): 'Production' | 'Alpha' | 'Beta' {
  if (PRODUCTION_CHAINS.includes(chainId)) {
    return 'Production'
  } else if (ALPHA_CHAINS.includes(chainId)) {
    return 'Alpha'
  }
  return 'Beta'
}

export function getPriorityLevelByChain(chainId: string): number {
  if (PRODUCTION_CHAINS.includes(chainId)) {
    return 0
  } else if (ALPHA_CHAINS.includes(chainId)) {
    return 2
  }
  return 1
}

export function processChains(chains: Chain[]): Chain[] {
  if (!chains.length) {
    return chains
  }
  return chains
    .sort((a, b) => {
      const chainA = a.description.toUpperCase()
      const chainB = b.description.toUpperCase()

      if (chainA < chainB) {
        return -1
      } else if (chainA > chainB) {
        return 1
      }
      return 0
    })
    .sort((a, b) => {
      const priorityA = getPriorityLevelByChain(a.id)
      const priorityB = getPriorityLevelByChain(b.id)

      return priorityA - priorityB
    })
}
