import { Container, Stack, Title } from "@mantine/core"
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
      <Stack gap="xl">
        <Title order={2}>Settings & members</Title>
        <LinkTabs routes={routes} />
      </Stack>
      {children}
    </Container>
  )
}
