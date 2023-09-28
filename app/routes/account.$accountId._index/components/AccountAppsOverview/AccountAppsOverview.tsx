import {
  Box,
  createStyles,
  SimpleGrid,
  Stack,
  Text,
} from "@pokt-foundation/pocket-blocks"
import React from "react"

type AppStat = { label: string; val: string; time: string }

const stats: AppStat[] = [
  { label: "Total Relays", val: "54,828", time: "24hrs" },
  { label: "Average Latency", val: "90ms", time: "24hrs" },
  { label: "Success", val: "99.92%", time: "24hrs" },
  { label: "Errors", val: "8", time: "24hrs" },
  { label: "Uptime", val: "99.72%", time: "30days" },
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
        {stats.map(({ label, val, time }) => (
          <Box key={label} className={classes.stat}>
            <Stack align="center" spacing={0}>
              <Text fw={600} fz="md">
                {val}
              </Text>
              <Text>{label}</Text>
              <Text color="dimmed" fz="xs" lh={1.1}>
                {time}
              </Text>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  )
}

export default AccountAppsOverview
