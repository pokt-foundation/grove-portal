export const addIfMissing = (item: string, arr: string[]) => {
  if (arr.indexOf(item) !== -1) {
    return arr
  }
  return [...arr, item]
}