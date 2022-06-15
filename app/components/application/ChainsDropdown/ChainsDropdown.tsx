import styles from "./styles.css"
import { CHAIN_ID_PREFIXES } from "~/utils/chainUtils"
import Dropdown, {
  DropdownMenu,
  links as DropdownLinks,
} from "~/components/shared/Dropdown"
import { IconPlus } from "@pokt-foundation/ui"
import ChainWithImage, { links as ChainWithImageLinks } from "../ChainWithImage"
import { useState } from "react"
import TextInput from "~/components/shared/TextInput"

export const links = () => {
  return [
    ...DropdownLinks(),
    ...ChainWithImageLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

interface AppEndpointProps {
  handleChainClick: (chainId: string) => void
}

export default function ChainsDropdown({ handleChainClick }: AppEndpointProps) {
  const allChains = Array.from(CHAIN_ID_PREFIXES.entries())
  const [query, setQuery] = useState("")

  return (
    <span className="pokt-chains-dropdown">
      <Dropdown
        label={
          <span>
            Add New <IconPlus />
          </span>
        }
      >
        <TextInput
          placeholder="Search Chains"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
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
