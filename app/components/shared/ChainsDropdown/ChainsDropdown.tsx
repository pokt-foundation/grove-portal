import {
  Group,
  IconPlus,
  MantineTheme,
  SelectItem,
  Select,
  Text,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { forwardRef, useMemo, useRef } from "react"
import { BlockchainsQuery } from "~/models/portal/sdk"

const SelectItem = forwardRef<HTMLDivElement, { label: string; value: string }>(
  ({ label, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Text size="xs" m={0}>
          {label}
        </Text>
      </Group>
    </div>
  ),
)

SelectItem.displayName = "SelectItem"

const ChainsDropdown = ({
  chains,
  onChange,
}: {
  chains: BlockchainsQuery["blockchains"]
  onChange: (chain: string) => void
}) => {
  const theme = useMantineTheme()
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
      itemComponent={SelectItem}
      placeholder="Add new"
      rightSection={<IconPlus fill={theme.colors.blue[5]} height={18} width={18} />}
      size="xs"
      sx={(theme: MantineTheme) => ({
        ".mantine-Select-dropdown": {
          backgroundColor: theme.colors.navy[6],
        },
        ".mantine-Select-input": {
          backgroundColor: "transparent",
          borderColor: theme.colors.blue[5],
        },
        ".mantine-Select-input::placeholder": {
          color: theme.colors.blue[5],
          fontWeight: 600,
          fontSize: "12px",
        },
      })}
      onChange={onChange}
    />
  )
}

export default ChainsDropdown
