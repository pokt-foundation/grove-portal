import { NumberFormatter, Stack, Text, Title } from "@mantine/core"
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
  return (
    <Stack gap={32}>
      <Title order={2}>Billing</Title>

      {upcomingInvoice ? (
        <Stack
          gap={4}
          p={20}
          style={{
            border: "1px solid var(--app-shell-border-color)",
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
            The amount is subject to change daily depending on your current usage.
          </Text>
        </Stack>
      ) : null}

      <InvoicesDataTable invoices={invoices} usageRecords={usageRecords} />
    </Stack>
  )
}

export default AccountBillingView
