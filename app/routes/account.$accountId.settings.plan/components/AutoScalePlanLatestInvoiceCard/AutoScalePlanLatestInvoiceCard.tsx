import { Accordion, Divider } from "@mantine/core"
import { Button, Grid, Group, Stack, Text } from "@pokt-foundation/pocket-blocks"
import { useParams } from "@remix-run/react"
import { Emoji } from "emoji-picker-react"
import React from "react"
import { LuArrowUpRight, LuDownload } from "react-icons/lu"
import { TitledCard } from "~/components/TitledCard"
import { RoleName } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import { AccountPlanViewProps } from "~/routes/account.$accountId.settings.plan/view"
import useCommonStyles from "~/styles/commonStyles"
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
  const { classes: commonClasses } = useCommonStyles()

  const totalAccountRelays = accountAppsRelays.reduce(
    (acc, item) => acc + item.Count.Total,
    0,
  )

  const invoiceUsageRecords = usageRecords.data.find(
    (record) => record.invoice === invoice.id,
  )

  return (
    <TitledCard header={() => <Text weight={600}>Latest Invoice</Text>}>
      <Stack pt={22} px={20} spacing={12}>
        <Group position="apart">
          <Text>Invoice ID</Text> <Text>{invoice.id}</Text>
        </Group>
        <Divider />
        <Group position="apart">
          <Text>Status</Text>
          <Text color={invoice.paid ? "green" : "gray"}>
            {invoice.paid ? "Paid" : "Open"}
          </Text>
        </Group>
        <Divider />

        <Accordion
          defaultValue="item-1"
          styles={{
            item: { borderBottom: "none" },
            content: { padding: 0 },
            control: {
              padding: 0,
              paddingBottom: 12,
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          <Accordion.Item value="item-1">
            <Accordion.Control>
              <Group position="apart">
                <Text fz="sm">Total Relays Used</Text>
                <Text fz="sm">{totalAccountRelays}</Text>
              </Group>
            </Accordion.Control>
            <Divider />
            <Accordion.Panel>
              {accountAppsRelays.map(({ name, appEmoji, Count }, index) => (
                <React.Fragment key={`${name}-${index}`}>
                  <Group pl={20} position="apart" py={12}>
                    <Group spacing={6}>
                      <Emoji size={14} unified={appEmoji} />
                      <Text>{name}</Text>
                    </Group>
                    <Text>{Count.Total}</Text>
                  </Group>
                  <Divider />
                </React.Fragment>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Group position="apart">
          <Text>Relays Billed</Text>
          <Text>{invoiceUsageRecords ? invoiceUsageRecords?.total_usage : "-"}</Text>
        </Group>
        <Divider />
        <Group position="apart">
          <Text>Start period</Text>
          <Text>{formatTimestampShort(invoice.period_start)}</Text>
        </Group>
        <Divider />
        <Group position="apart">
          <Text>End period</Text>
          <Text>{formatTimestampShort(invoice.period_end)}</Text>
        </Group>
        <Divider />

        {userRole !== RoleName.Member && (
          <Grid gutter="sm" justify="flex-end">
            <Grid.Col lg={4} md={4} sm={6}>
              <Button
                fullWidth
                className={commonClasses.grayOutline}
                color="gray"
                component="a"
                href={invoice.hosted_invoice_url ?? ""}
                rel="noreferrer"
                rightIcon={<LuArrowUpRight size={18} />}
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
            <Grid.Col lg={4} md={4} sm={6}>
              <Button
                fullWidth
                component="a"
                href={invoice.invoice_pdf ?? ""}
                rightIcon={<LuDownload size={18} />}
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
