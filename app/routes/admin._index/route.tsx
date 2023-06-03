import { Grid, Group, Select, Title } from "@pokt-foundation/pocket-blocks"
import { json, LinksFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData, useSearchParams } from "@remix-run/react"
import UsageChartCard, {
  links as UsageChartCardLinks,
} from "~/components/application/UsageChartCard"
import { getRelaysPerPeriod, RelayMetric } from "~/models/relaymeter/relaymeter.server"

export const links: LinksFunction = () => [...UsageChartCardLinks()]

type LoaderData = {
  relays: RelayMetric[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const days = url.searchParams.get("days")

  const relays = await getRelaysPerPeriod("network", days ? Number(days) : 7)

  return json<LoaderData>({
    relays: relays,
  })
}

export default function Analytics() {
  const { relays } = useLoaderData() as LoaderData
  const [searchParams, setSearchParams] = useSearchParams()
  const days = searchParams.get("days")

  return (
    <Grid>
      <Grid.Col>
        <Group
          position="apart"
          sx={(theme) => ({
            paddingBottom: theme.spacing.lg,
            borderBottom: `1px solid ${
              theme.colorScheme === "dark" ? theme.colors.navy[4] : theme.colors.gray[2]
            }`,
          })}
        >
          <Title order={1}>Dashboard</Title>
        </Group>
      </Grid.Col>
      <Grid.Col>
        <UsageChartCard
          detail={
            <Select
              aria-label="Time Period"
              data={[
                {
                  value: "3",
                  label: "3 Days",
                },
                {
                  value: "7",
                  label: "7 Days",
                },
                {
                  value: "30",
                  label: "30 Days",
                },
              ]}
              defaultValue={days ?? "7"}
              placeholder="Time Period"
              size="xs"
              onChange={(value) => {
                searchParams.set("days", value as string)
                setSearchParams(searchParams)
              }}
            />
          }
          height="400px"
          relays={relays}
          title="Network Relay Count"
        />
      </Grid.Col>
    </Grid>
  )
}
