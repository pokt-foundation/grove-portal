import styles from "./styles.css"
import { CHAIN_ID_PREFIXES } from "~/utils/chainUtils"
import Dropdown, {
  DropdownMenu,
  links as DropdownLinks,
} from "~/components/shared/Dropdown"
import { IconPlus } from "@pokt-foundation/ui"
import ChainWithImage, { links as ChainWithImageLinks } from "../ChainWithImage"
import React, { SyntheticEvent, useState } from "react"
import TextInput from "~/components/shared/TextInput"

export const links = () => {
  return [
    ...DropdownLinks(),
    ...ChainWithImageLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

interface AppEndpointProps {
  selectedChains: string[]
  handleChainClick: (chainId: string) => void
}

export default function ChainsDropdown({
  selectedChains,
  handleChainClick,
}: AppEndpointProps) {
  const allChains = Array.from(CHAIN_ID_PREFIXES.entries()).filter(
    ([id]) => !selectedChains.includes(id),
  )
  const [query, setQuery] = useState("")

  const handleSearch = (e: SyntheticEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }

  return (
    <span className="pokt-chains-dropdown">
      <Dropdown
        label={
          <>
            Add New <IconPlus />
          </>
        }
      >
        <TextInput placeholder="Search Chains" value={query} onChange={handleSearch} />
        {allChains &&
          allChains
            .filter(([_, row]) =>
              Object.values(row)
                .join()
                .toLowerCase()
                .trim()
                .includes(query.toLowerCase().trim()),
            )
            .map(([id, { name }]) => (
              <DropdownMenu.Item
                key={id}
                className="pokt-chains-dropdown-chain"
                onClick={() => handleChainClick(id)}
              >
                <ChainWithImage chain={name} />
              </DropdownMenu.Item>
            ))}
      </Dropdown>
    </span>
  )
}
