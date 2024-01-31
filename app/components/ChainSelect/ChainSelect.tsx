import { Group, Input, Menu, UnstyledButton, Text } from "@mantine/core"
import React, { useState } from "react"
import { LuCheckCircle2, LuChevronsUpDown } from "react-icons/lu/index.js"
import Chain from "~/components/Chain"
import { Blockchain } from "~/models/portal/sdk"

type ChainSelectProps = {
  chains: Blockchain[]
  selectedChain: Blockchain
  onChainSelect: (chain: Blockchain) => void
  width?: string | number
}

const ChainSelect = ({ chains, selectedChain, onChainSelect }: ChainSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const filteredChains = chains.filter(
    (chain) =>
      chain.blockchain.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      chain.description?.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  )

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
      <Menu.Dropdown px={8} py="md">
        <Input
          mb={8}
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredChains.length > 0 ? (
          filteredChains.map((item, index) => (
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
          ))
        ) : (
          <Text pt="sm">No results found</Text>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}

export default ChainSelect
