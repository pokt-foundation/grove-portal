import { getRequiredClientEnvVar } from "./environment"
import { Blockchain } from "~/models/portal/sdk"
import { KeyValuePair } from "~/types/global"

export const CHAIN_DOCS_URL: KeyValuePair<string> = {
  "arbitrum-one": "arbitrum-one-api/intro",
  "avax-mainnet": "avalanche-api/intro",
  "avax-archival": "avalanche-api/intro",
  "base-mainnet": "base-api/intro",
  "base-testnet": "base-api/intro",
  "boba-mainnet": "boba-api/intro",
  "bsc-mainnet": "binance-smart-chain-api/intro",
  "bsc-archival": "binance-smart-chain-api/intro",
  "celo-mainnet": "celo-api/intro",
  "celestia-archival": "celestia-api/endpoints/celestia-archival",
  "avax-dfk": "avalanche-api/intro",
  "dogechain-mainnet": "dogechain-api/intro",
  "eth-mainnet": "ethereum-api/intro",
  "eth-archival": "ethereum-api/intro",
  "eth-trace": "ethereum-api/intro",
  "holesky-fullnode-testnet": "ethereum-api/intro",
  rinkeby: "ethereum-api/intro",
  "eth-goerli": "ethereum-api/intro",
  "goerli-archival": "ethereum-api/intro",
  "evmos-mainnet": "evmos-api/intro",
  "fantom-mainnet": "fantom-api/intro",
  "fuse-mainnet": "fuse-api/intro",
  "harmony-0": "harmony-shard-0-api/intro",
  "gnosischain-mainnet": "gnosis",
  "gnosischain-archival": "gnosis",
  "iotex-mainnet": "iotex-api/intro",
  "kava-mainnet": "kava-api/intro",
  "kava-mainnet-archival": "kava-api/intro",
  "klaytn-mainnet": "klaytn-api/intro",
  "metis-mainnet": "metis-api/intro",
  "moonbeam-mainnet": "moonbeam-api/intro",
  "moonriver-mainnet": "moonriver-api/intro",
  "near-mainnet": "near-api/intro",
  "oKc-mainnet": "okc-api/intro",
  "oasys-mainnet": "oasys-api/intro",
  "oasys-mainnet-archival": "oasys-api/intro",
  "optimism-mainnet": "optimism-api/intro",
  "optimism-archival": "optimism-api/intro",
  "osmosis-mainnet": "osmosis-api/intro",
  mainnet: "",
  "poly-mainnet": "polygon-api/intro",
  "poly-archival": "polygon-api/intro",
  "polygon-zkevm-mainnet": "polygon-api/intro",
  "polygon-mumbai": "polygon-api/intro",
  "radix-mainnet": "radix-api/intro",
  "solana-mainnet": "solana-api/intro",
  "solana-custom": "solana-api/intro",
  "sui-mainnet": "sui-api/intro",
  "scroll-mainnet": "scroll-api/intro",
  "scroll-testnet": "scroll-api/intro",
  "zksync-era-mainnet": "zksync-era-api/intro",
  "blast-archival": "blastchain-api/intro",
  "opbnb-archival": "binance-smart-chain-api/endpoints/opBNB-archival",
  "zklink-nova-archival": "zklink-nova-api/endpoints/zklink-nova-archival",
}

export const evmChains = [
  "amoy-testnet-archival",
  "arbitrum-one",
  "arbitrum-sepolia-archival",
  "avax-archival",
  "avax-dfk",
  "avax-mainnet",
  "base-mainnet",
  "base-testnet",
  "blast-archival",
  "boba-mainnet",
  "bsc-archival",
  "bsc-mainnet",
  "celo-mainnet",
  "eth-archival",
  "eth-goerli",
  "eth-mainnet",
  "eth-trace",
  "evmos-mainnet",
  "fraxtal-archival",
  "fantom-mainnet",
  "fuse-mainnet",
  "fuse-archival",
  "gnosischain-mainnet",
  "gnosischain-archival",
  "goerli-archival",
  "harmony-0",
  "holesky-fullnode-testnet",
  "iotex-mainnet",
  "kava-mainnet",
  "kava-mainnet-archival",
  "klaytn-mainnet",
  "metis-mainnet",
  "moonbeam-mainnet",
  "moonriver-mainnet",
  "oKc-mainnet",
  "oasys-mainnet",
  "oasys-mainnet-archival",
  "opbnb-archival",
  "optimism-mainnet",
  "optimism-archival",
  "optimism-sepolia-archival",
  "poly-mainnet",
  "poly-archival",
  "polygon-mumbai",
  "polygon-zkevm-mainnet",
  "scroll-mainnet",
  "scroll-testnet",
  "sepolia",
  "sepolia-archival",
  "zksync-era-mainnet",
]

export const evmMethods = [
  "eth_accounts",
  "eth_blockNumber",
  "eth_call",
  "eth_chainId",
  "eth_estimateGas",
  "eth_gasPrice",
  "eth_getBalance",
  "eth_getBlockByHash",
  "eth_getBlockByNumber",
  "eth_getBlockTransactionCountByHash",
  "eth_getBlockTransactionCountByNumber",
  "eth_getCode",
  "eth_getLogs",
  "eth_getStorageAt",
  "eth_getTransactionByBlockHashAndIndex",
  "eth_getTransactionByBlockNumberAndIndex",
  "eth_getTransactionByHash",
  "eth_getTransactionCount",
  "eth_getTransactionReceipt",
  "eth_getUncleByBlockHashAndIndex",
  "eth_getUncleByBlockNumberAndIndex",
  "eth_getUncleCountByBlockHash",
  "eth_getUncleCountByBlockNumber",
  "eth_getProof",
  "eth_getWork",
  "eth_hashrate",
  "eth_mining",
  "eth_protocolVersion",
  "eth_sendRawTransaction",
  "eth_submitWork",
  "eth_syncing",
]

export const isEvmChain = (chain: Blockchain | null): boolean =>
  !!chain && evmChains.includes(chain.blockchain)

export const getAppEndpointUrl = (
  chain: Blockchain | undefined | null,
  appId: string | undefined,
) => {
  let env = "city"
  if (getRequiredClientEnvVar("VERCEL_ENV") !== "production") {
    env = "town"
  }

  return `https://${chain?.blockchain}.rpc.grove.${env}/v1/${appId}`
}

export const getChainName = ({
  chainId,
  chains,
}: {
  chainId: string | undefined
  chains: Blockchain[]
}): string => {
  if (!chainId) {
    return ""
  }
  const chain = chains.find((chain) => chain.id === chainId)
  return chain?.blockchain ?? chainId
}
