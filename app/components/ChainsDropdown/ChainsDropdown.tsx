import { Group, Select, Text } from "@pokt-foundation/pocket-blocks"
import { forwardRef, useMemo, useRef } from "react"
import { LuSearch } from "react-icons/lu"
import { BlockchainsQuery } from "~/models/portal/sdk"

const SelectItem = forwardRef<HTMLDivElement, { label: string; value: string }>(
  ({ label, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Text m={0} size="xs">
          {label}
        </Text>
      </Group>
    </div>
  ),
)

SelectItem.displayName = "SelectItem"

type ChainsDropdownProps = {
  chains: BlockchainsQuery["blockchains"]
  onChange: (chain: string) => void
  width?: string | number
}

const ChainsDropdown = ({ chains, onChange, width }: ChainsDropdownProps) => {
  const addNewChainSelectRef = useRef<HTMLInputElement>(null)

  const selectChainData = useMemo(() => {
    return chains
      .map((chain) => ({
        label: chain?.description ?? "",
        value: chain?.id ?? "",
      }))
      .sort((a, b) => {
        if (a.label < b.label) {
          return -1
        }
        if (a.label > b.label) {
          return 1
        }
        return 0
      })
  }, [chains])

  return (
    <Select
      ref={addNewChainSelectRef}
      searchable
      aria-label="Add new"
      data={selectChainData}
      icon={<LuSearch size={18} />}
      itemComponent={SelectItem}
      placeholder="Search Network"
      rightSection={<></>}
      rightSectionWidth={0}
      w={width}
      onChange={onChange}
    />
  )
}

export default ChainsDropdown
