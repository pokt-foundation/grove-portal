import { Divider } from "@mantine/core"
import { Container, Stack } from "@pokt-foundation/pocket-blocks"
import { useEffect, useState } from "react"
import ApplicationHeader from "./components/ApplicationHeader"
import LinkTabs from "~/components/LinkTabs"
import { PayPlanType, PortalApp } from "~/models/portal/sdk"

type AppIdLayoutViewProps = {
  app: PortalApp
  children: React.ReactNode
}

export type Route = {
  to: string
  label?: string
  icon?: React.ReactNode | (() => JSX.Element) | React.FunctionComponent
  end?: boolean
  external?: boolean
}

export default function AppIdLayoutView({ app, children }: AppIdLayoutViewProps) {
  const [routes, setRoutes] = useState<Route[]>([
    {
      to: "",
      label: "Endpoints",
      end: true,
    },
    {
      to: "security",
      label: "Security",
    },
    {
      to: "team",
      label: "Team",
    },
    {
      to: "keys",
      label: "Keys",
    },
    {
      to: "plan",
      label: "Plan",
    },
  ])

  useEffect(() => {
    if (
      app &&
      app.legacyFields.planType === PayPlanType.PayAsYouGoV0 &&
      routes.find((route) => route.to === "notifications")
    ) {
      setRoutes((curr) => [...curr.filter((c) => c.to !== "notifications")])
    }
    if (
      app &&
      app.legacyFields.planType !== PayPlanType.PayAsYouGoV0 &&
      !routes.find((route) => route.to === "notifications")
    ) {
      setRoutes((curr) => [
        ...curr.slice(0, 2),
        {
          to: "notifications",
          label: "Notifications",
        },
        ...curr.slice(2),
      ])
    }
  }, [app, routes])

  return (
    <Container fluid pt={16} px={0}>
      <Stack spacing="xl">
        <ApplicationHeader app={app} />
        <Divider />
        <LinkTabs routes={routes} />
        <Divider />
      </Stack>
      {children}
    </Container>
  )
}
