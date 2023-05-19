export const MAX_USER_APPS = 2
export const SESSIONS_PER_DAY = 24

// const FREE_TIER_TOKENS = 3120000000
export const FREE_TIER_MAX_RELAYS = 250_000

export const UPOKT = 1000000

/**
 * Shorten a Pocket address, `charsLength` allows to change the number of
 * characters on both sides of the ellipsis.
 *
 * Examples:
 *   shortenAddress('D19731977931271')    // D1973…1271
 *   shortenAddress('A19731977931271', 2) // A1…71
 *   shortenAddress('F197319')            // F197319 (already short enough)
 */
export function shortenAddress(address: string, charsLength = 4): string {
  const prefixLength = 2 // "0x"

  if (!address) {
    return ""
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address
  }
  return address.slice(0, charsLength + prefixLength) + "…" + address.slice(-charsLength)
}

/**
 * Converts a normal integer POKT amount to a 6-decimal representation (uPOKT).
 * 1 POKT = 1000000 uPOKT.
 * @param quantity the amount to convert.
 * @returns the amount as a native Javascript Big Integer.
 */
export function poktToUpokt(quantity: string | bigint | number): bigint {
  return BigInt(quantity) * BigInt(UPOKT)
}

/**
 * Converts from a 6-decimal representation (uPOKT) to a normal integer POKT amount.
 * 1 POKT = 1000000 uPOKT.
 * @param quantity the amount to convert.
 * @returns the amount as a native Javascript Big Integer.
 */
export function uPoktToPokt(quantity: string | bigint | number): bigint {
  return BigInt(quantity) / BigInt(UPOKT)
}
