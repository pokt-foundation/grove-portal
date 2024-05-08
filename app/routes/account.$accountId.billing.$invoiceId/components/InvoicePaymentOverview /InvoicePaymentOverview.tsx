import { Box, NumberFormatter, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { DataTable } from "mantine-datatable"
import React, { useMemo } from "react"
import { Account } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import { INVOICE_STATUS_COLOR } from "~/routes/account.$accountId.billing._index/components/InvoicesDataTable"
import { getStripeAmount, getUnitPrice } from "~/utils/billingUtils"
import { getPlanName } from "~/utils/planUtils"

type InvoicePaymentOverviewProps = {
  invoice: Stripe.Invoice
  usageRecords?: Stripe.UsageRecordSummary[]
  planType: Account["planType"]
}

type InvoiceDiscountsProps = {
  discounts: {
    coupon: Stripe.Coupon | undefined
    amount: number
  }[]
}

const InvoiceDiscounts = ({ discounts }: InvoiceDiscountsProps) => {
  return (
    <>
      {discounts.map((discount) => (
        <>
          <Text c="dimmed">
            {discount.coupon?.name}{" "}
            {discount.coupon?.percent_off
              ? `(${discount.coupon?.percent_off}% off)`
              : null}
          </Text>
          <NumberFormatter
            thousandSeparator
            allowNegative={false}
            prefix="- USD $"
            style={{ color: "var(--mantine-color-dimmed)" }}
            value={getStripeAmount(discount.amount)}
          />
        </>
      ))}
    </>
  )
}

const InvoicePaymentOverview = ({
  invoice,
  planType,
  usageRecords,
}: InvoicePaymentOverviewProps) => {
  const invoiceWithUSage = useMemo(() => {
    const invoiceUsageRecord = usageRecords?.find(
      (usageRecord) => usageRecord.invoice === invoice?.id,
    )
    return {
      planType: planType,
      id: invoice.id,
      number: invoice.number,
      status: invoice.status,
      total_excluding_tax: invoice.total_excluding_tax,
      unit_price: getUnitPrice(invoice.lines?.data[0]?.plan?.amount_decimal),
      total_usage: invoiceUsageRecord?.total_usage,
    }
  }, [invoice, planType, usageRecords])

  const invoiceDiscounts = useMemo(() => {
    return invoice.total_discount_amounts?.map((discount) => {
      const invoiceExpandedDiscounts = invoice.discounts as Stripe.Discount[]
      const discountWithCoupon = invoiceExpandedDiscounts.find(
        (invoiceDiscount) => discount.discount === invoiceDiscount.id,
      )

      const { amount } = discount
      return {
        amount,
        coupon: discountWithCoupon?.coupon,
      }
    })
  }, [invoice.total_discount_amounts, invoice.discounts])

  return (
    <Stack>
      <Title order={6}>Payment Overview</Title>
      <DataTable
        columns={[
          {
            accessor: "planType",
            title: "Description",
            render: ({ planType }) => getPlanName(planType),
          },
          {
            accessor: "status",
            render: ({ status }) => (
              <Text c={status ? INVOICE_STATUS_COLOR[status] : ""} tt="capitalize">
                {status}
              </Text>
            ),
            title: "Status",
          },
          {
            accessor: "total_usage",
            title: "Relays Billed",
            noWrap: true,
            render: ({ total_usage }) => (
              <NumberFormatter thousandSeparator value={total_usage} />
            ),
          },
          {
            accessor: "unit_price",
            title: "Unit Price",
            noWrap: true,
            width: 250,
            render: ({ unit_price }) => (
              <NumberFormatter suffix=" USD" value={unit_price ?? 0} />
            ),
          },
          {
            accessor: "total_excluding_tax",
            title: "Amount",
            noWrap: true,
            width: 250,
            render: ({ total_excluding_tax }) => (
              <NumberFormatter
                thousandSeparator
                prefix="USD $"
                value={getStripeAmount(total_excluding_tax)}
              />
            ),
          },
        ]}
        records={[invoiceWithUSage]}
        verticalSpacing="sm"
      />
      <Stack align="flex-end">
        <Box px="xs" w={{ base: "100%", sm: 500 }}>
          <SimpleGrid cols={2}>
            <Text>Subtotal</Text>
            <NumberFormatter
              thousandSeparator
              prefix="USD $"
              value={getStripeAmount(invoice?.subtotal)}
            />
            {invoiceDiscounts && <InvoiceDiscounts discounts={invoiceDiscounts} />}
            <Text>Total due</Text>
            <NumberFormatter
              thousandSeparator
              prefix="USD $"
              value={getStripeAmount(invoice?.total_excluding_tax)}
            />
            {invoice?.tax ? (
              <>
                <Text>Tax</Text>
                <NumberFormatter
                  thousandSeparator
                  prefix="USD $"
                  value={invoice?.tax ?? "-"}
                />
              </>
            ) : null}

            <Text>Total amount paid</Text>
            <NumberFormatter
              thousandSeparator
              allowNegative={false}
              prefix="- USD $"
              value={getStripeAmount(invoice?.amount_paid)}
            />
            <Text>Amount due</Text>
            <NumberFormatter
              thousandSeparator
              prefix="USD $"
              value={getStripeAmount(invoice?.amount_remaining)}
            />
          </SimpleGrid>
        </Box>
      </Stack>
    </Stack>
  )
}

export default InvoicePaymentOverview
