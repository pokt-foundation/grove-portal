import { Group, Menu, UnstyledButton } from "@pokt-foundation/pocket-blocks"
import React from "react"
import { LuCheckCircle2, LuChevronsUpDown } from "react-icons/lu"
import Chain from "~/components/Chain"
import { Blockchain } from "~/models/portal/sdk"

type ChainSelectProps = {
  chains: Blockchain[]
  selectedChain: Blockchain
  onChainSelect: (chain: Blockchain) => void
  width?: string | number
}

const ChainSelect = ({ chains, selectedChain, onChainSelect }: ChainSelectProps) => {
  return (
    <Menu styles={{ dropdown: { minWidth: 300, marginLeft: 8 } }}>
      <Menu.Target>
        <UnstyledButton px={8} py={4} style={{ maxWidth: 305, borderRadius: 4 }}>
          <Group>
            <Chain chain={selectedChain} />
            <LuChevronsUpDown size={18} style={{ marginLeft: "auto", marginRight: 0 }} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      {chains && chains?.length > 0 && (
        <Menu.Dropdown px={8} py="md">
          {chains.map((item, index) => (
            <Menu.Item
              key={item.id}
              disabled={item.id === selectedChain.id}
              mb={index === chains.length - 1 ? 0 : 8}
              p={2}
              onClick={() => onChainSelect(item)}
            >
              <Group>
                <Chain chain={item} />
                {item.id === selectedChain.id && (
                  <LuCheckCircle2
                    size={18}
                    style={{ marginLeft: "auto", marginRight: 0 }}
                  />
                )}
              </Group>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      )}
    </Menu>
  )
}

export default ChainSelect
