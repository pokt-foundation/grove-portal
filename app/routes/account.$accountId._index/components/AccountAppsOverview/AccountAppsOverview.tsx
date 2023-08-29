import { Box, createStyles, Flex, SimpleGrid, Text } from "@pokt-foundation/pocket-blocks"
import React from "react"

type AppStat = { label: string; val: string }

const stats: AppStat[] = [
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

export const AccountAppsOverview = () => {
  const { classes } = useStyles()

  return (
    <>
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
    </>
  )
}

export default AccountAppsOverview
