import { Outlet } from "@remix-run/react"
import { useEffect, useState } from "react"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
import AppAddressCard, {
  links as AppAddressCardLinks,
} from "~/components/application/AppAddressCard"
import AppKeysCard, {
  links as AppKeysCardLinks,
} from "~/components/application/AppKeysCard"
import AppRemoveModal, {
  links as AppRemoveModalLinks,
} from "~/components/application/AppRemoveModal"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import Grid from "~/components/shared/Grid"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import Nav, { links as NavLinks } from "~/components/shared/Nav"
import { useTranslate } from "~/context/TranslateContext"
import { ProcessedEndpoint } from "~/models/portal/sdk"

/* c8 ignore start */
export const links = () => {
  return [
    ...NavLinks(),
    ...AppKeysCardLinks(),
    ...AppAddressCardLinks(),
    ...AdEconomicsForDevsLinks(),
    ...FeedbackCardLinks(),
    ...AppRemoveModalLinks(),
    ...ModalLinks(),
  ]
}
/* c8 ignore stop */

type AppIdLayoutViewProps = {
  endpoint: ProcessedEndpoint | null
  searchParams: URLSearchParams
}

export default function AppIdLayoutView({
  endpoint,
  searchParams,
}: AppIdLayoutViewProps) {
  const { t } = useTranslate()
  const [showSuccessModal, setShowSuccessModel] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModel] = useState<boolean>(false)

  const routes = [
    {
      to: "/dashboard/apps",
      icon: () => <span>{"<"}</span>,
      end: true,
    },
    {
      to: "",
      label: t.appId.routes.overview,
      end: true,
    },
    {
      to: "requests",
      label: t.appId.routes.requests,
    },
    {
      to: "security",
      label: t.appId.routes.security,
    },
    {
      to: "notifications",
      label: t.appId.routes.notifications,
    },
  ]

  useEffect(() => {
    const success = searchParams.get("success")
    if (!success) return
    if (success === "true") {
      setShowSuccessModel(true)
    }
    if (success === "false") {
      setShowErrorModel(true)
    }
  }, [searchParams])

  return (
    <>
      <Grid gutter={32}>
        {endpoint && (
          <Grid.Col xs={12}>
            <div>
              <h1>{endpoint.name}</h1>
              <Nav routes={routes} />
            </div>
          </Grid.Col>
        )}
        <Grid.Col md={8}>
          <Outlet />
        </Grid.Col>
        <Grid.Col md={4}>
          {endpoint && (
            <>
              <section>
                <AppKeysCard
                  id={endpoint.id}
                  publicKey={endpoint.apps[0]?.publicKey}
                  secret={endpoint.gatewaySettings.secretKey}
                />
              </section>
              <section>
                <AppAddressCard apps={endpoint.apps} />
              </section>
              <section>
                <AdEconomicsForDevs />
              </section>
              <section>
                <FeedbackCard />
              </section>
              <section>
                <AppRemoveModal appId={endpoint.id} />
              </section>
            </>
          )}
        </Grid.Col>
      </Grid>
      <Modal
        opened={showSuccessModal}
        title="Congratulations!"
        onClose={() => setShowSuccessModel(false)}
      >
        <div>
          <p>
            You have successfully set up a pay as you go subscription. You now have access
            to 50+ chains and unlimited relays. We can't wait to see what you build with
            it!
          </p>
        </div>
      </Modal>
      <Modal
        opened={showErrorModal}
        title="Subscription Error"
        onClose={() => setShowErrorModel(false)}
      >
        <div>
          <p>
            We are sorry but something went wrong when setting up your pay as you go
            subscription. Please try again. If you are still having trouble reach out and
            we would be happy to help get you sorted.
          </p>
        </div>
      </Modal>
    </>
  )
}
