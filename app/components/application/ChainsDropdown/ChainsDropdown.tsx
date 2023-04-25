import { Button, IconPlus, Menu, MenuProps } from "@pokt-foundation/pocket-blocks"
import React, { SyntheticEvent, useState } from "react"
import styles from "./styles.css"
import ChainWithImage, { links as ChainWithImageLinks } from "../ChainWithImage"
// import Dropdown, {
//   links as DropdownLinks,
// } from "~/components/shared/Dropdown"
import TextInput from "~/components/TextInput"
import { BlockchainsQuery } from "~/models/portal/sdk"

/* c8 ignore start */
export const links = () => {
  return [
    // ...DropdownLinks(),
    ...ChainWithImageLinks(),
    { rel: "stylesheet", href: styles },
  ]
}
/* c8 ignore stop */

type AppEndpointProps = MenuProps & {
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
  ...props
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
      <Menu {...props}>
        <Menu.Target>
          <Button rightIcon={icon && <IconPlus />} size="xs" variant="outline">
            {defaultText || "Add New"}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <TextInput placeholder="Search Chains" value={query} onChange={handleSearch} />
          {allChains &&
            allChains
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
                <Menu.Item
                  key={chain?.id}
                  className="pokt-chains-dropdown-chain"
                  onClick={() => handleChainClick(`${chain?.id}`)}
                >
                  <ChainWithImage chain={chain?.description} withIcon={false} />
                </Menu.Item>
              ))}
        </Menu.Dropdown>
      </Menu>
    </span>
  )
}
