export function formatNumberToSICompact(n: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(n)
}

export function commify(n: number | string): string {
  return new Intl.NumberFormat('en-US').format(n as number)
}
