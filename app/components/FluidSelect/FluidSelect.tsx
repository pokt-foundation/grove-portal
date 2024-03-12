import {
  Box,
  FocusTrap,
  Group,
  Input,
  MantineTheme,
  Menu,
  MenuProps,
  Text,
  UnstyledButton,
} from "@mantine/core"
import React, { forwardRef, useMemo, useState } from "react"
import { LuCheck, LuChevronDown } from "react-icons/lu"

type SelectItem = { label: string; value: string }

type FluidSelectProps = {
  items: SelectItem[]
  value?: string
  onSelect: (value: string) => void
  width?: string | number
  filter?: (value: string, item: SelectItem) => boolean
  itemComponent?: React.FC<any>
  renderButton?: (value: string) => React.ReactNode
  placeholder?: string
  styles?: MenuProps["styles"]
  withSearch?: boolean
  disabled?: boolean
}

const defaultFilter = (value: string, item: SelectItem) =>
  item?.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
  item.value.toLowerCase().includes(value.toLowerCase().trim())

type SelectButtonProps = Pick<
  FluidSelectProps,
  "renderButton" | "placeholder" | "disabled"
> & {
  selectedItem?: SelectItem
}

const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(
  (
    { selectedItem, renderButton, placeholder, disabled, ...others }: SelectButtonProps,
    ref,
  ) => {
    const _renderButton = () => {
      const _render =
        renderButton ||
        ((label: string) => (
          <Text truncate fz={14} maw={150}>
            {label}
          </Text>
        ))
      return selectedItem
        ? _render(selectedItem?.label)
        : _render(placeholder ?? "Select...")
    }

    return (
      <UnstyledButton
        ref={ref}
        maw={305}
        px={14}
        py={8}
        {...others}
        opacity={disabled ? 0.5 : 1}
      >
        <Group>
          {_renderButton()}
          <LuChevronDown size={14} style={{ marginLeft: "auto", marginRight: 0 }} />
        </Group>
      </UnstyledButton>
    )
  },
)

SelectButton.displayName = "SelectButton"

const FluidSelect = forwardRef<HTMLDivElement, FluidSelectProps>(
  (
    {
      items,
      value,
      onSelect,
      filter,
      itemComponent: ItemComponent,
      renderButton,
      placeholder,
      styles,
      withSearch,
      disabled,
    }: FluidSelectProps,
    ref,
  ) => {
    const [searchTerm, setSearchTerm] = useState("")
    const initialSelectedItem = items.find((item) => item.value === value)

    const [selectedItem, setSelectedItem] = useState<SelectItem | undefined>(
      initialSelectedItem,
    )

    const filteredItems = useMemo(() => {
      return withSearch
        ? items.filter((item) => (filter || defaultFilter)(searchTerm, item))
        : items
    }, [withSearch, items, filter, searchTerm])

    return (
      <Box ref={ref}>
        <Menu
          disabled={disabled}
          position="bottom-start"
          styles={styles}
          onClose={() => setSearchTerm("")}
        >
          <Menu.Target>
            <SelectButton
              disabled={disabled}
              placeholder={placeholder}
              renderButton={renderButton}
              selectedItem={selectedItem}
            />
          </Menu.Target>
          <FocusTrap active>
            <Menu.Dropdown px={8} py="md">
              {withSearch && (
                <Input
                  autoFocus
                  mb={8}
                  placeholder="Search..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <Menu.Item
                    key={item.label}
                    disabled={item.value === value}
                    mb={index === items.length - 1 ? 0 : 8}
                    p={5}
                    style={(theme: MantineTheme) => ({
                      ...(item.value === value && {
                        backgroundColor: theme.colors.dark[7],
                        color: theme.colors.dark[0],
                        opacity: 1,
                      }),
                    })}
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedItem(item)
                      onSelect(item.value)
                    }}
                  >
                    <Group>
                      {ItemComponent ? (
                        <ItemComponent {...item} />
                      ) : (
                        <Text>{item.label}</Text>
                      )}
                      {item.value === value && (
                        <LuCheck
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
          </FocusTrap>
        </Menu>
      </Box>
    )
  },
)

FluidSelect.displayName = "FluidSelect"

export default FluidSelect
