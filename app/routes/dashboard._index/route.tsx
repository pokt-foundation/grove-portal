import { Divider } from "@mantine/core"
import {
  Box,
  Card,
  createStyles,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@pokt-foundation/pocket-blocks"

import { LoaderFunction, redirect } from "@remix-run/node"
import React from "react"
import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts"
import { TitledCard } from "~/components/TitledCard"

export const loader: LoaderFunction = async ({ request }) => {
  // return redirect("/dashboard/apps")
  return null
}

type stat = { label: string; val: string }

const stats: stat[] = [
  { label: "Total Relays (24hrs)", val: "54,828" },
  { label: "Average Latency (24hrs)", val: "90ms" },
  { label: "Success % (24hrs)", val: "99.92%" },
  { label: "Errors (24hrs)", val: "8" },
  { label: "Uptime (30days)", val: "99.72%" },
]

const useStyles = createStyles((theme) => ({
  stat: {
    padding: "24px 20px",
    "&:not(:last-child)": {
      borderRight: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
      }`,
    },
  },
}))

export default function Dashboard() {
  const { classes } = useStyles()

  const data = [
    {
      date: "Jul 15",
      val: 0,
    },
    {
      date: "Jul 16",
      val: 65,
    },
    {
      date: "Jul 17",
      val: 20,
    },
    {
      date: "Jul 18",
      val: 51,
    },
    {
      date: "Jul 19",
      val: 162,
    },
    {
      date: "Jul 20",
      val: 25,
    },
    {
      date: "Jul 21",
      val: 180,
    },
  ]

  return (
    <Stack>
      <TitledCard
        header={() => (
          <Group position="apart">
            <Text weight={600}>Organization Overview</Text>
          </Group>
        )}
      >
        <Card.Section>
          <SimpleGrid
            breakpoints={[
              { maxWidth: "sm", cols: 1 },
              { maxWidth: "md", cols: 2 },
            ]}
            cols={5}
          >
            {stats.map(({ label, val }) => (
              <Box key={label} className={classes.stat}>
                <Flex align="center" direction="column" gap={4}>
                  <Text fw={600} fz="md">
                    {val}
                  </Text>
                  <Text>{label}</Text>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Card.Section>
      </TitledCard>

      <Divider my="xl" />

      <TitledCard
        header={() => (
          <Group position="apart">
            <Text weight={600}>Total Relays</Text>
          </Group>
        )}
      >
        <Card.Section inheritPadding>
          <Box h="350px" pt="xl">
            <Text fw="600" fz="md" mb="lg">
              542,499
            </Text>
            <ResponsiveContainer height="100%" width="100%">
              <LineChart data={data} height={350} margin={{ bottom: 100 }}>
                {/* style={{ transform: "translate(-5px, -5px)" }} }} */}
                {/* tick={{ stroke: "red", strokeWidth: 2, x: 50, cx: 60, y: 100 }} */}
                <CartesianGrid
                  strokeWidth={0.2}
                  style={{ fill: "#343438" }}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  padding={{ left: 30, right: 30 }}
                  stroke="#343438"
                  tick={{ fill: "#808B95" }}
                  tickLine={false}
                  tickMargin={35}
                />
                <YAxis
                  axisLine={false}
                  includeHidden={true}
                  minTickGap={0}
                  tick={{ fill: "#808B95" }}
                  tickFormatter={(val) => (val === 0 ? val : `${val}k`)}
                  tickLine={false}
                />
                <Tooltip />
                <Line
                  // activeDot={{ r: 8 }}
                  dataKey="val"
                  dot={false}
                  stroke="#0079E8"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card.Section>
      </TitledCard>

      {/*<SimpleGrid breakpoints={[{ maxWidth: "md", cols: 1 }]} cols={2}>*/}
      {/*  <TitledCard*/}
      {/*    header={() => (*/}
      {/*      <Group position="apart">*/}
      {/*        <Text weight={600}>Total Relays</Text>*/}
      {/*      </Group>*/}
      {/*    )}*/}
      {/*  >*/}
      {/*    <Card.Section inheritPadding>*/}
      {/*      <Box h="350px" pt="xl">*/}
      {/*        <ResponsiveContainer height="100%" width="100%">*/}
      {/*          <LineChart data={data} height={350}>*/}
      {/*            <CartesianGrid strokeWidth={0.3} vertical={false} />*/}
      {/*            <XAxis*/}
      {/*              dataKey="date"*/}
      {/*              height={40}*/}
      {/*              padding={{ left: 30, right: 30 }}*/}
      {/*              tickMargin={20}*/}
      {/*            />*/}
      {/*            <YAxis*/}
      {/*              axisLine={false}*/}
      {/*              includeHidden={true}*/}
      {/*              minTickGap={0}*/}
      {/*              tickFormatter={(val) => (val === 0 ? val : `${val}k`)}*/}
      {/*              tickLine={false}*/}
      {/*            />*/}
      {/*            <Tooltip />*/}
      {/*            <Line dataKey="val" dot={false} stroke="#0079E8" strokeWidth={3} />*/}
      {/*          </LineChart>*/}
      {/*        </ResponsiveContainer>*/}
      {/*      </Box>*/}
      {/*    </Card.Section>*/}
      {/*  </TitledCard>*/}
      {/*  <TitledCard*/}
      {/*    header={() => (*/}
      {/*      <Group position="apart">*/}
      {/*        <Text weight={600}>Total Relays</Text>*/}
      {/*      </Group>*/}
      {/*    )}*/}
      {/*  >*/}
      {/*    <Card.Section inheritPadding>*/}
      {/*      <Box h="350px" pt="xl">*/}
      {/*        <ResponsiveContainer height="100%" width="100%">*/}
      {/*          <LineChart*/}
      {/*            data={data}*/}
      {/*            height={350}*/}
      {/*            margin={{*/}
      {/*              top: 5,*/}
      {/*              right: 5,*/}
      {/*              left: 0,*/}
      {/*              bottom: 5,*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            <CartesianGrid strokeWidth={0.3} vertical={false} />*/}
      {/*            <XAxis*/}
      {/*              dataKey="date"*/}
      {/*              padding={{ left: 30, right: 30 }}*/}
      {/*              tickMargin={20}*/}
      {/*            />*/}
      {/*            <YAxis*/}
      {/*              axisLine={false}*/}
      {/*              includeHidden={true}*/}
      {/*              minTickGap={0}*/}
      {/*              tickFormatter={(val) => (val === 0 ? val : `${val}k`)}*/}
      {/*              tickLine={false}*/}
      {/*            />*/}
      {/*            <Tooltip />*/}
      {/*            <Line dataKey="val" dot={false} stroke="#0079E8" strokeWidth={3} />*/}
      {/*          </LineChart>*/}
      {/*        </ResponsiveContainer>*/}
      {/*      </Box>*/}
      {/*    </Card.Section>*/}
      {/*  </TitledCard>*/}
      {/*</SimpleGrid>*/}
    </Stack>
  )
}
