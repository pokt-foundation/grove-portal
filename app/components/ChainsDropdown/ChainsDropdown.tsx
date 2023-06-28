import { useClickOutside } from "@mantine/hooks"
import {
  Button,
  Checkbox,
  Group,
  IconPlus,
  IconSearch,
  Select,
  Text,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { forwardRef, useMemo, useState } from "react"
import { BlockchainsQuery } from "~/models/portal/sdk"

const CheckboxItem = forwardRef<
  HTMLDivElement,
  { label: string; value: string; checked: boolean }
>(({ checked, label, ...others }, ref) => {
  return (
    <div ref={ref} {...others}>
      <Checkbox
        readOnly
        checked={checked}
        label={label}
        styles={{
          label: {
            cursor: "pointer",
          },

          input: {
            cursor: "pointer",
          },
        }}
      />
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
  onChange,
}: {
  chains: BlockchainsQuery["blockchains"]
  checkboxData?: string[]
  onChange: (chain: string) => void
}) => {
  const [isInputShown, setIsInputShown] = useState(false)
  const theme = useMantineTheme()
  const selectRef = useClickOutside(() => setIsInputShown(false))

  const selectChainData = useMemo(() => {
    return chains
      .map((chain) => {
        const isChecked =
          checkboxData && checkboxData?.length && checkboxData.includes(chain?.id ?? "")

        return {
          label: chain?.description ?? "",
          value: chain?.id ?? "",
          checked: isChecked ?? false,
          group: isChecked ? "Checked" : "Unchecked",
        }
      })
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [chains, checkboxData])

  return isInputShown ? (
    <div ref={selectRef}>
      <Select
        initiallyOpened
        searchable
        allowDeselect={true}
        aria-label="Search Network"
        data={selectChainData}
        icon={<IconSearch fill={theme.colors.blue[5]} height={18} width={18} />}
        itemComponent={checkboxData ? CheckboxItem : SelectItem}
        placeholder="Search Network"
        rightSectionWidth={0}
        size="xs"
        styles={{
          dropdown: {
            backgroundColor: theme.colors.navy[6],
          },

          input: {
            backgroundColor: "transparent",
            borderColor: theme.colors.blue[5],

            "&::placeholder": {
              color: theme.colors.blue[5],
              fontWeight: 600,
              fontSize: "12px",
            },
          },

          item: {
            cursor: "pointer",
          },
        }}
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
