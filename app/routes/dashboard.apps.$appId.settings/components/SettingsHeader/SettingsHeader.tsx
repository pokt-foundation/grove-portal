import {
  Button,
  Flex,
  Menu,
  Title,
  IconMoreVertical,
  IconKey,
  IconDeleteAlt,
  ActionIcon,
} from "@pokt-foundation/pocket-blocks"

interface SettingsHeaderProps {
  setIsKeysModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsRemoveAppOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export function SettingsHeader({
  setIsKeysModalOpen,
  setIsRemoveAppOpened,
}: SettingsHeaderProps) {
  return (
    <Flex justify="space-between" mb="xl">
      <Title
        order={2}
        sx={(theme) => ({ fontSize: "1.125rem", color: theme.colors.gray[1] })}
      >
        Manage your App
      </Title>

      <Flex align="center" gap={12}>
        <Button
          leftIcon={<IconKey width={12} />}
          sx={(theme) => ({
            color: theme.colors.gray[5],
            fontSize: "0.75rem",
          })}
          variant="subtle"
          onClick={() => setIsKeysModalOpen(true)}
        >
          View keys
        </Button>
        <Menu>
          <Menu.Target>
            <ActionIcon
              sx={(theme) => ({
                color: theme.colors.gray[5],
              })}
              variant="subtle"
            >
              <IconMoreVertical height={16} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              icon={<IconDeleteAlt width={12} />}
              onClick={() => setIsRemoveAppOpened(true)}
            >
              Delete Application
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default SettingsHeader
