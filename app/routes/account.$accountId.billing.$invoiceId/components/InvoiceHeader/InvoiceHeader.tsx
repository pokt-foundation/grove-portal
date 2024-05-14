import {
  Button,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core"
import { NavLink } from "@remix-run/react"
import React from "react"
import { LuArrowLeft } from "react-icons/lu"
import { Stripe } from "~/models/stripe/stripe.server"
import { formatStripeDate } from "~/utils/billingUtils"

type InvoiceHeaderProps = {
  invoice: Stripe.Invoice
  charge?: Stripe.Charge
}
const InvoiceHeader = ({ invoice, charge }: InvoiceHeaderProps) => {
  const theme = useMantineTheme()

  return (
    <Stack gap="xl" justify="center">
      <Button
        color="gray"
        component={NavLink}
        leftSection={<LuArrowLeft size={18} />}
        ml={-8}
        mr="auto"
        size="compact-sm"
        to=".."
        variant="subtle"
      >
        Back to Billing
      </Button>
      <Group justify="space-between">
        <Stack gap={5}>
          <Title order={2}>Invoice {invoice?.number} </Title>
          <Text>
            {formatStripeDate(invoice.period_start)} -{" "}
            {formatStripeDate(invoice.period_end, "Do MMM YYYY")}
          </Text>
        </Stack>
        <Group
          gap={0}
          style={{
            border: `1px solid ${theme.colors.gray[8]}`,
            borderRadius: 4,
          }}
        >
          <Button
            color="gray"
            component="a"
            href={invoice?.invoice_pdf ?? ""}
            rel="noreferrer"
            target="_blank"
            variant="subtle"
          >
            Download
          </Button>
          {invoice.status !== "paid" ? (
            <>
              <Divider orientation="vertical" />
              <Button
                color="gray"
                component="a"
                href={invoice?.hosted_invoice_url ?? ""}
                rel="noreferrer"
                target="_blank"
                variant="subtle"
              >
                Pay Invoice
              </Button>
            </>
          ) : null}
          {charge?.receipt_url ? (
            <>
              <Divider orientation="vertical" />
              <Button
                color="gray"
                component="a"
                href={charge?.receipt_url ?? ""}
                rel="noreferrer"
                target="_blank"
                variant="subtle"
              >
                View Receipt
              </Button>
            </>
          ) : null}
        </Group>
      </Group>
    </Stack>
  )
}

export default InvoiceHeader
