import avaxImage from "./images/avax.png"
import bscImage from "./images/bsc.png"
import ethImage from "./images/eth.png"
import fuseImage from "./images/fuse.png"
import kovanImage from "./images/kovan.png"
import poktImage from "./images/pokt.png"
import polygonImage from "./images/polygon.png"
import solanaImage from "./images/solana.png"
import xdaiImage from "./images/xdai.png"
import algorandImage from "./images/algorand.png"
import evmosImage from "./images/evmos.png"
import gnosisImage from "./images/gnosis.png"
import harmonyImage from "./images/harmony.png"
import iotexImage from "./images/iotex.png"
import oecImage from "./images/oec.png"
import bobaImage from "./images/boba.png"

/**
 * Gets the corresponding image for a specific chain.
 * @param chain {string}
 * @returns image {string}
 */
export function getImageForChain(chain: string): string {
  if (
    chain.toLowerCase().includes("avax") ||
    chain.toLocaleLowerCase().includes("avalanche")
  ) {
    return avaxImage
  }

  if (chain.toLowerCase().includes("binance")) {
    return bscImage
  }

  if (
    chain.toLowerCase().includes("ethereum mainnet") ||
    chain.toLowerCase().includes("ropsten") ||
    chain.toLowerCase().includes("rinkeby") ||
    chain.toLowerCase().includes("goerli")
  ) {
    return ethImage
  }

  if (chain.toLowerCase().includes("fuse")) {
    return fuseImage
  }

  if (chain.toLowerCase().includes("kovan")) {
    return kovanImage
  }

  if (chain.toLowerCase().includes("pocket")) {
    return poktImage
  }

  if (chain.toLowerCase().includes("polygon")) {
    return polygonImage
  }

  if (chain.toLowerCase().includes("solana")) {
    return solanaImage
  }

  if (chain.toLowerCase().includes("xdai")) {
    return xdaiImage
  }

  if (chain.toLowerCase().includes("algorand")) {
    return algorandImage
  }

  if (chain.toLowerCase().includes("evmos")) {
    return evmosImage
  }

  if (chain.toLowerCase().includes("gnosis")) {
    return gnosisImage
  }

  if (chain.toLowerCase().includes("harmony")) {
    return harmonyImage
  }

  if (chain.toLowerCase().includes("iotex")) {
    return iotexImage
  }

  if (chain.toLowerCase().includes("oec")) {
    return oecImage
  }

  if (chain.toLowerCase().includes("boba")) {
    return bobaImage
  }

  return ""
}
