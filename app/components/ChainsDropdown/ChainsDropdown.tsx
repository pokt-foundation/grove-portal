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
import { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import { useUser } from "~/context/UserContext"
import { BlockchainsQuery, EndpointQuery } from "~/models/portal/sdk"

const CheckboxItem = forwardRef<
  HTMLDivElement,
  { label: string; value: string; checked: boolean }
>(({ checked, label, ...others }, ref) => {
  return (
    <div ref={ref} {...others}>
      <Checkbox checked={checked} label={label} />
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
  const selectRef = useRef<HTMLDivElement>(null)
  const addNewChainSelectRef = useRef<HTMLInputElement>(null)
  const user = useUser()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsInputShown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
  }, [chains, user, endpoint])

  return isInputShown || !checkboxData ? (
    <div ref={selectRef}>
      <Select
        allowDeselect={true}
        ref={addNewChainSelectRef}
        searchable
        aria-label="Search Network"
        data={selectChainData}
        icon={<IconSearch fill={theme.colors.blue[5]} height={18} width={18} />}
        itemComponent={checkboxData ? CheckboxItem : SelectItem}
        placeholder="Search Network"
        rightSectionWidth={0}
        size="xs"
        sx={(theme: MantineTheme) => ({
          ".mantine-Select-dropdown": {
            backgroundColor: theme.colors.navy ? theme.colors.navy[6] : "black",
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
      onClick={() => setIsInputShown(true)}
      size="xs"
      variant="outline"
    >
      Add Network
    </Button>
  )
}

export default ChainsDropdown
