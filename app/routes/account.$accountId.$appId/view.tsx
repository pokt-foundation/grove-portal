import { Divider } from "@mantine/core"
import {
  Button,
  Container,
  Flex,
  Avatar,
  Text,
  Stack,
} from "@pokt-foundation/pocket-blocks"
import { FetcherWithComponents } from "@remix-run/react"
import { Emoji } from "emoji-picker-react"
import { useState } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import Modal, { ModalCTA } from "~/components/Modal"
import { Route } from "~/components/Nav"
import { EndpointQuery } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import AppOverviewTabs from "~/routes/account.$accountId.$appId/components/AppOverviewTabs"
import useSubscriptionSync from "~/routes/account.$accountId.$appId/hooks/useSubscriptionSync"
import { DEFAULT_APPMOJI } from "~/routes/account_.$accountId.create/components/AppmojiPicker"

type AppIdLayoutViewProps = {
  endpoint: EndpointQuery["endpoint"] | null
  searchParams: URLSearchParams
  setSearchParams: (typeof URLSearchParams)["arguments"]
  subscription: Stripe.Subscription | undefined
  updatePlanFetcher: FetcherWithComponents<any>
  user: Auth0Profile
  children: React.ReactNode
}

export default function AppIdLayoutView({
  endpoint,
  searchParams,
  setSearchParams,
  subscription,
  updatePlanFetcher,
  user,
  children,
}: AppIdLayoutViewProps) {
  const [showSuccessModal, setShowSuccessModel] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModel] = useState<boolean>(false)

  const [routes, setRoutes] = useState<Route[]>([
    {
      to: "",
      label: "Overview",
      end: true,
    },
    {
      to: "requests",
      label: "Requests",
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
  ])

  useSubscriptionSync({
    routes,
    endpoint,
    setRoutes,
    subscription,
    searchParams,
    setSearchParams,
    updatePlanFetcher,
    setShowErrorModel,
    setShowSuccessModel,
  })

  return (
    <Container fluid pt={16} px={0}>
      <Stack spacing="xl">
        {endpoint && (
          <Flex align="center" gap="sm">
            <Avatar color="dark" radius="xl" variant="outline">
              <Emoji size={14} unified={DEFAULT_APPMOJI} />
            </Avatar>
            <Text fw={600} fz="md">
              {endpoint.name}
            </Text>
          </Flex>
        )}
        <Divider />
        <AppOverviewTabs routes={routes} />
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
