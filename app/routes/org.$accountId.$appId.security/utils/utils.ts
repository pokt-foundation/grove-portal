import { Maybe, WhitelistContracts, WhitelistMethods } from "~/models/portal/sdk"

export type WhitelistContract = Pick<WhitelistContracts, "blockchainID" | "contracts">
export type WhitelistMethod = Pick<WhitelistMethods, "blockchainID" | "methods">

export type BlockchainWhitelist = {
  blockchainID: string
  whitelistValue: string
}

export const formatBlockchainWhitelist = <T extends WhitelistContract | WhitelistMethod>(
  data: Maybe<T>[],
  key: keyof T,
) => {
  return data.reduce((prev: BlockchainWhitelist[], curr) => {
    if (!curr) {
      return prev
    }
    const subArray = (curr[key] as unknown as string[]).reduce(
      (subPrev: BlockchainWhitelist[], subCurr) => {
        return [...subPrev, { blockchainID: curr.blockchainID, whitelistValue: subCurr }]
      },
      [],
    )
    return [...prev, ...subArray]
  }, [])
}
