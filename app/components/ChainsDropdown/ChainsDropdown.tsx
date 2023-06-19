import { useClickOutside } from "@mantine/hooks"
import {
  Button,
  Checkbox,
  Group,
  IconPlus,
  IconSearch,
  MantineTheme,
  Select,
  Text,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { forwardRef, useMemo, useState } from "react"
import { BlockchainsQuery, EndpointQuery } from "~/models/portal/sdk"

const CheckboxItem = forwardRef<
  HTMLDivElement,
  { label: string; value: string; checked: boolean }
>(({ checked, label, ...others }, ref) => {
  return (
    <div ref={ref} {...others}>
      <Checkbox readOnly checked={checked} label={label} />
    </div>
  )
})

CheckboxItem.displayName = "SelectItem"

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

const ChainsDropdown = ({
  chains,
  checkboxData,
  endpoint,
  onChange,
}: {
  chains: BlockchainsQuery["blockchains"]
  checkboxData?: string[]
  endpoint: EndpointQuery["endpoint"]
  onChange: (chain: string) => void
}) => {
  const [isInputShown, setIsInputShown] = useState(false)
  const theme = useMantineTheme()
  const selectRef = useClickOutside(() => setIsInputShown(false))

  const selectChainData = useMemo(() => {
    return chains
      .map((chain) => ({
        label: chain?.description ?? "",
        value: chain?.id ?? "",
        checked:
          (checkboxData &&
            checkboxData?.length &&
            checkboxData.includes(chain?.id ?? "")) ??
          false,
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [chains, checkboxData])

  return isInputShown || !checkboxData ? (
    <div ref={selectRef}>
      <Select
        searchable
        allowDeselect={true}
        aria-label="Search Network"
        data={selectChainData}
        icon={<IconSearch fill={theme.colors.blue[5]} height={18} width={18} />}
        itemComponent={checkboxData ? CheckboxItem : SelectItem}
        placeholder="Search Network"
        rightSectionWidth={0}
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
    </div>
  ) : (
    <Button
      aria-label="Add Network"
      leftIcon={<IconPlus height="18px" width="18px" />}
      size="xs"
      variant="outline"
      onClick={() => setIsInputShown(true)}
    >
      Add Network
    </Button>
  )
}

export default ChainsDropdown
