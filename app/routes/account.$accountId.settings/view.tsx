import { Container, Stack, Text, Title } from "@mantine/core"
import React, { useMemo } from "react"
import LinkTabs from "~/components/LinkTabs"
import { Account, PayPlanType } from "~/models/portal/sdk"

type AccountSettingsLayoutViewProps = {
  account: Account
  children: React.ReactNode
}

export default function AccountSettingsLayoutView({
  account,
  children,
}: AccountSettingsLayoutViewProps) {
  const routes = useMemo(() => {
    return [
      ...[
        {
          to: "",
          label: "Account",
          end: true,
        },
        {
          to: "members",
          label: "Members",
        },
        {
          to: "plan",
          label: "Plan",
        },
      ],
      ...(account.planType === PayPlanType.FreetierV0
        ? [
            {
              to: "notifications",
              label: "Notifications",
            },
          ]
        : []),
    ]
  }, [account])

  return (
    <Container fluid px={0}>
      <Stack gap={32}>
        <Stack gap="xs">
          <Title order={3}>Settings & members</Title>
          <Text>Change your organization name and manage your team and plan.</Text>
        </Stack>
        <LinkTabs routes={routes} />
      </Stack>
      {children}
    </Container>
  )
}
