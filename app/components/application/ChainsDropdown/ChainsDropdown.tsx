import { Button, IconPlus, Menu, MenuProps, Text } from "@pokt-foundation/pocket-blocks"
import { SyntheticEvent, useState } from "react"
import TextInput from "~/components/shared/TextInput"
import { BlockchainsQuery } from "~/models/portal/sdk"

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
                  <Text>{chain?.description}</Text>
                </Menu.Item>
              ))}
        </Menu.Dropdown>
      </Menu>
    </span>
  )
}
