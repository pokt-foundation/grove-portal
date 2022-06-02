export const MAX_USER_APPS = 2

export const FREE_TIER_TOKENS = 3120000000
export const FREE_TIER_MAX_RELAYS = 1000000

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
    return ''
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address
  }
  return (
    address.slice(0, charsLength + prefixLength) +
    '…' +
    address.slice(-charsLength)
  )
}
