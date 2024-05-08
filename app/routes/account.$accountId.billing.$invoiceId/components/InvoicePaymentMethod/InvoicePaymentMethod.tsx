import { Stack, Text, Title, Tooltip } from "@mantine/core"
import { DataTable } from "mantine-datatable"
import React from "react"
import { Stripe } from "~/models/stripe/stripe.server"
import { CHARGE_STATUS_COLOR } from "~/utils/billingUtils"

const InvoicePaymentMethod = ({ charge }: { charge: Stripe.Charge }) => {
  return (
    <Stack>
      <Title order={6}>Payment Method</Title>
      <DataTable
        columns={[
          {
            accessor: "payment_method_details",
            render: ({ payment_method_details }) => (
              <Text tt="capitalize">
                {payment_method_details?.type} ({payment_method_details?.card?.brand})
              </Text>
            ),
            title: "Type",
          },
          {
            accessor: "payment_method_details.card.last4",
            render: ({ payment_method_details }) =>
              `---- ${payment_method_details?.card?.last4}`,
            title: "Number",
          },
          {
            accessor: "payment_method_details.card",
            render: ({ payment_method_details }) =>
              `${payment_method_details?.card?.exp_month}/
                    ${payment_method_details?.card?.exp_year}`,
            title: "Expires",
          },
          {
            accessor: "status",
            render: ({ status }) => (
              <Tooltip disabled={status !== "failed"} label={charge?.failure_message}>
                <Text
                  c={CHARGE_STATUS_COLOR[status]}
                  style={
                    status === "failed"
                      ? {
                          textDecoration: "underline",
                          textDecorationStyle: "dotted",
                        }
                      : {}
                  }
                  tt="capitalize"
                >
                  {status}
                </Text>
              </Tooltip>
            ),
            title: "Status",
          },
        ]}
        records={[charge]}
        verticalSpacing="sm"
      />
    </Stack>
  )
}

export default InvoicePaymentMethod
