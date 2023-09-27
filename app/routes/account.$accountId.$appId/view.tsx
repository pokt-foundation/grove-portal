import { Divider } from "@mantine/core"
import { Button, Container, Stack } from "@pokt-foundation/pocket-blocks"
import { useEffect, useState } from "react"
import ApplicationHeader from "./components/ApplicationHeader"
import LinkTabs from "~/components/LinkTabs"
import Modal, { ModalCTA } from "~/components/Modal"
import { Route } from "~/components/Nav"
import { PayPlanType, PortalApp } from "~/models/portal/sdk"

type AppIdLayoutViewProps = {
  app: PortalApp
  children: React.ReactNode
}

export default function AppIdLayoutView({ app, children }: AppIdLayoutViewProps) {
  const [showSuccessModal, setShowSuccessModel] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModel] = useState<boolean>(false)

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
      to: "notifications",
      label: "Notifications",
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
      <Modal
        opened={showSuccessModal}
        title="Congratulations!"
        onClose={() => setShowSuccessModel(false)}
      >
        <div>
          <p>
            You have successfully set up a Pay As You Go subscription. You now have access
            to dozens of chains and unlimited relays. We can't wait to see what you build
            with it!
          </p>
        </div>
        <ModalCTA>
          <Button onClick={() => setShowSuccessModel(false)}>Continue To App</Button>
        </ModalCTA>
      </Modal>
      <Modal
        opened={showErrorModal}
        title="Subscription Error"
        onClose={() => setShowErrorModel(false)}
      >
        <div>
          <p>
            We are sorry but something went wrong when setting up your pay as you go
            subscription. Please try again by clicking the "Upgrade to 'Pay As You Go'"
            button. If you are still having trouble reach out and we would be happy to
            help get you sorted.
          </p>
        </div>
        <ModalCTA>
          <Button onClick={() => setShowErrorModel(false)}>Try Again</Button>
        </ModalCTA>
      </Modal>
    </Container>
  )
}
