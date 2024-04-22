import { Accordion, Divider, Button, Grid, Group, Stack, Text } from "@mantine/core"
import { useParams } from "@remix-run/react"
import { Emoji } from "emoji-picker-react"
import React from "react"
import { LuArrowUpRight, LuDownload } from "react-icons/lu"
import classes from "./AutoScalePlanLatestInvoiceCard.module.css"
import { TitledCard } from "~/components/TitledCard"
import { RoleName } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import { AccountPlanViewProps } from "~/routes/account.$accountId.settings.plan/view"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { formatTimestampShort } from "~/utils/dayjs"

type AutoScalePlanLatestInvoiceCardProps = Required<
  Pick<AccountPlanViewProps, "accountAppsRelays" | "usageRecords" | "userRole">
> & {
  invoice: Stripe.Invoice
}

export default function AutoScalePlanLatestInvoiceCard({
  invoice,
  usageRecords,
  accountAppsRelays,
  userRole,
}: AutoScalePlanLatestInvoiceCardProps) {
  const { accountId } = useParams()
  const totalAccountRelays = accountAppsRelays.reduce(
    (acc, item) => acc + (item.totalCount ? item.totalCount : 0),
    0,
  )

  const invoiceUsageRecords = usageRecords.data.find(
    (record) => record.invoice === invoice.id,
  )

  return (
    <TitledCard header={() => <Text fw={600}>Latest Invoice</Text>}>
      <Stack gap={12} pt={22} px={20}>
        <Group justify="space-between">
          <Text>Invoice ID</Text> <Text>{invoice.id}</Text>
        </Group>
        <Divider />
        <Group justify="space-between">
          <Text>Status</Text>
          <Text c={invoice.paid ? "green" : "gray"}>
            {invoice.paid ? "Paid" : "Open"}
          </Text>
        </Group>
        <Divider />

        <Accordion
          classNames={{ control: classes.accordionControl }}
          defaultValue="item-1"
          styles={{
            item: { borderBottom: "none" },
            content: { padding: 0 },
            label: { padding: 0 },
          }}
        >
          <Accordion.Item value="item-1">
            <Accordion.Control>
              <Group justify="space-between">
                <Text fz="sm">Total Relays Used</Text>
                <Text fz="sm">{totalAccountRelays}</Text>
              </Group>
            </Accordion.Control>
            <Divider />
            <Accordion.Panel>
              {accountAppsRelays.map(({ name, appEmoji, totalCount }, index) => (
                <React.Fragment key={`${name}-${index}`}>
                  <Group justify="space-between" pl={20} py={12}>
                    <Group gap={6}>
                      <Emoji size={14} unified={appEmoji} />
                      <Text>{name}</Text>
                    </Group>
                    <Text>{totalCount ?? "-"}</Text>
                  </Group>
                  <Divider />
                </React.Fragment>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Group justify="space-between">
          <Text>Relays Billed</Text>
          <Text>{invoiceUsageRecords ? invoiceUsageRecords?.total_usage : "-"}</Text>
        </Group>
        <Divider />
        <Group justify="space-between">
          <Text>Start period</Text>
          <Text>{formatTimestampShort(invoice.period_start)}</Text>
        </Group>
        <Divider />
        <Group justify="space-between">
          <Text>End period</Text>
          <Text>{formatTimestampShort(invoice.period_end)}</Text>
        </Group>
        <Divider />

        {userRole !== RoleName.Member && (
          <Grid gutter="sm" justify="flex-end">
            <Grid.Col span={{ base: 6, md: 4 }}>
              <Button
                fullWidth
                color="gray"
                component="a"
                href={invoice.hosted_invoice_url ?? ""}
                rel="noreferrer"
                rightSection={<LuArrowUpRight size={18} />}
                target="_blank"
                variant="outline"
                onClick={() => {
                  trackEvent({
                    category: AnalyticCategories.account,
                    action: AnalyticActions.account_plan_invoice_view,
                    label: accountId,
                  })
                }}
              >
                View in Stripe
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 4 }}>
              <Button
                fullWidth
                component="a"
                href={invoice.invoice_pdf ?? ""}
                rightSection={<LuDownload size={18} />}
                onClick={() => {
                  trackEvent({
                    category: AnalyticCategories.account,
                    action: AnalyticActions.account_plan_invoice_download,
                    label: accountId,
                  })
                }}
              >
                Download
              </Button>
            </Grid.Col>
          </Grid>
        )}
      </Stack>
    </TitledCard>
  )
}
