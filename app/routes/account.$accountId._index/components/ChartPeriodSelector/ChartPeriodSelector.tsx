import { Button, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import { Form, useSearchParams } from "@remix-run/react"

export const ChartPeriodSelector = () => {
  const theme = useMantineTheme()
  const [searchParams] = useSearchParams()
  const daysParam = searchParams.get("days") ?? "7"
  // Static component for now
  return (
    <Form>
      <Button.Group>
        <Button
          bg={daysParam === "7" ? theme.colors.dark[7] : theme.colors.dark[9]}
          name="days"
          radius="sm"
          size="xs"
          type="submit"
          value={7}
          variant="default"
        >
          7d
        </Button>
        <Button
          bg={daysParam === "30" ? theme.colors.dark[7] : theme.colors.dark[9]}
          name="days"
          radius="sm"
          size="xs"
          type="submit"
          value={30}
          variant="default"
        >
          30d
        </Button>
        <Button
          bg={daysParam === "60" ? theme.colors.dark[7] : theme.colors.dark[9]}
          name="days"
          radius="sm"
          size="xs"
          type="submit"
          value={60}
          variant="default"
        >
          60d
        </Button>
        <Button
          bg={daysParam === "90" ? theme.colors.dark[7] : theme.colors.dark[9]}
          name="days"
          radius="sm"
          size="xs"
          type="submit"
          value={90}
          variant="default"
        >
          90d
        </Button>
      </Button.Group>
    </Form>
  )
}

export default { ChartPeriodSelector }
