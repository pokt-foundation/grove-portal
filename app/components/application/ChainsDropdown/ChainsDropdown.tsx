import { Box, IconPlus, Dropdown, Button } from "@pokt-foundation/pocket-blocks"
import React, { SyntheticEvent, useState } from "react"
import ChainWithImage, { links as ChainWithImageLinks } from "../ChainWithImage"
import styles from "./styles.css"
import { BlockchainsQuery } from "~/models/portal/sdk"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"

/* c8 ignore start */
export const links = () => {
  return [
    ...TextInputLinks(),
    ...ChainWithImageLinks(),
    { rel: "stylesheet", href: styles },
  ]
}
/* c8 ignore stop */

interface AppEndpointProps {
  blockchains: BlockchainsQuery["blockchains"]
  defaultText: string
  selectedChains: string[]
  icon?: boolean
  handleChainClick: (chainId: string) => void
}

export default function ChainsDropdown({
  blockchains,
  defaultText,
  icon = false,
  selectedChains,
  handleChainClick,
}: AppEndpointProps) {
  const allChains = blockchains.filter(
    (chain) => chain && !selectedChains.includes(chain.id),
  )
  const [query, setQuery] = useState("")

  const handleSearch = (e: SyntheticEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }

  return (
    <span className="pokt-chains-dropdown">
      <Dropdown
        content={
          <>
            <Box className="pokt-chains-dropdown-search">
              <TextInput
                placeholder="Search Chains"
                value={query}
                onChange={handleSearch}
              />
            </Box>

            {allChains
              .filter(
                (row) =>
                  row &&
                  Object.values(row)
                    .join()
                    .toLowerCase()
                    .trim()
                    .includes(query.toLowerCase().trim()),
              )
              .map((chain) => (
                <Box
                  key={chain?.id}
                  className="pokt-chains-dropdown-chain"
                  onClick={() => handleChainClick(`${chain?.id}`)}
                >
                  <ChainWithImage chain={chain?.description} />
                </Box>
              ))}
          </>
        }
        options={[]}
        trigger={
          <Button
            {...(icon && {
              iconRight: <IconPlus fill="var(--color-white-light)" />,
            })}
            variant="outline"
          >
            {defaultText || "Add New"}{" "}
          </Button>
        }
      />
    </span>
  )
}
