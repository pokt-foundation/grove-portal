import { Divider } from "@mantine/core"
import {
  Badge,
  Box,
  Button,
  CopyButton,
  Stack,
  Text,
  Tooltip,
} from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { Identicon } from "~/components/Identicon"
import { Account, RoleName } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type AccountSettingsViewProps = {
  account: Account
  userRole: RoleName
}

export const AccountSettingsView = ({ account, userRole }: AccountSettingsViewProps) => {
  const { classes: commonClasses } = useCommonStyles()
  return (
    <Stack spacing="xs">
      <Box py={20}>
        <Identicon
          alt={`${account?.name ?? "account"} avatar`}
          seed={account.id ?? "account default"}
          size="lg"
          type="account"
        />
        <Text fw={600} mt="xl">
          Account Avatar
        </Text>
        <Text pt={5}>A unique image representing your account. </Text>
      </Box>
      <Divider />
      {userRole !== RoleName.Member && (
        <>
          <Stack align="flex-start" py={20}>
            <Box>
              <Text fw={600}>Account Name</Text>
              <Text pt={5}>Modify your account name here. </Text>
            </Box>
            <Button
              className={commonClasses.grayOutlinedButton}
              color="gray"
              component={Link}
              to={`/account/${account.id}/update`}
              variant="outline"
              onClick={() => {
                trackEvent({
                  category: AnalyticCategories.account,
                  action: AnalyticActions.account_update_change_name,
                })
              }}
            >
              Change name
            </Button>
          </Stack>
          <Divider />
        </>
      )}

      <Stack py={20}>
        <Box>
          <Text fw={600}>Account ID</Text>
          <Text mb="xs" pt={5}>
            This is your unique organization ID.
          </Text>
          <CopyButton value={account.id}>
            {({ copied, copy }) => (
              <Tooltip withArrow label={copied ? "Copied" : "Copy"}>
                <Badge
                  color={copied ? "green" : "gray"}
                  px={6}
                  radius="sm"
                  style={{ cursor: "pointer", textTransform: "lowercase" }}
                  variant={copied ? "outline" : "light"}
                  onClick={() => {
                    copy()
                    trackEvent({
                      category: AnalyticCategories.account,
                      action: AnalyticActions.account_copy_id,
                      label: account.id,
                    })
                  }}
                >
                  {account.id}
                </Badge>
              </Tooltip>
            )}
          </CopyButton>
        </Box>
      </Stack>
    </Stack>
  )
}

export default AccountSettingsView
