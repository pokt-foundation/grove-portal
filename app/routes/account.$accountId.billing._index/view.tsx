import { NumberFormatter, Stack, Text, Title, useMantineTheme } from "@mantine/core"
import React from "react"
import { AccountBillingOutletContext } from "~/routes/account.$accountId.billing/route"
import InvoicesDataTable from "~/routes/account.$accountId.billing._index/components/InvoicesDataTable"
import { AccountBillingLoaderData } from "~/routes/account.$accountId.billing._index/route"
import { formatStripeDate, getStripeAmount } from "~/utils/billingUtils"

export type AccountBillingViewProps = Pick<
  AccountBillingOutletContext,
  "usageRecords" | "userRole"
> &
  AccountBillingLoaderData

export const AccountBillingView = ({
  usageRecords,
  invoices,
  upcomingInvoice,
}: AccountBillingViewProps) => {
  const theme = useMantineTheme()

  return (
    <Stack gap={32}>
      <Title order={2}>Billing</Title>

      {upcomingInvoice ? (
        <Stack
          gap={4}
          px={20}
          py={10}
          style={{
            border: `1px solid ${theme.colors.gray[8]}`,
            borderRadius: 4,
          }}
        >
          <Title order={4}>
            <NumberFormatter
              thousandSeparator
              prefix="$"
              value={getStripeAmount(upcomingInvoice?.amount_due)}
            />
          </Title>
          <Text>
            Your next invoice will be billed on{" "}
            {formatStripeDate(
              upcomingInvoice.next_payment_attempt ?? upcomingInvoice.period_end,
            )}
          </Text>
          <Text c="dimmed">
            The amount is subjected to change depending your current usage.
          </Text>
        </Stack>
      ) : null}

      <InvoicesDataTable invoices={invoices} usageRecords={usageRecords} />
    </Stack>
  )
}

export default AccountBillingView
