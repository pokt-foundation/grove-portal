import { Menu, Text } from "@pokt-foundation/pocket-blocks"
import { Link, useFetcher } from "@remix-run/react"
import { LuArrowUpFromLine, LuRepeat, LuStopCircle } from "react-icons/lu"
import useModals from "~/hooks/useModals"
import { ProcessedEndpoint } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import { isFreePlan, isLegacyPlan, isPaidPlan } from "~/utils/utils"

type AppSubscriptionProps = {
  endpoint: ProcessedEndpoint
  subscription?: Stripe.Subscription
}

const AppSubscription = ({ endpoint, subscription }: AppSubscriptionProps) => {
  const { id, name, appLimits } = endpoint
  const planType = appLimits.planType
  const fetcher = useFetcher()
  const { openConfirmationModal } = useModals()

  const stopSubscription = () => {
    fetcher.submit(
      { "app-id": id },
      {
        method: "POST",
        action: "/api/stripe/subscription",
      },
    )
  }

  const renewSubscription = () => {
    fetcher.submit(
      { "app-id": id, "subscription-renew": "true" },
      {
        method: "POST",
        action: "/api/stripe/subscription",
      },
    )
  }

  const openStopSubscriptionModal = () =>
    openConfirmationModal({
      title: <Text fw={600}>Stop Subscription</Text>,
      children: (
        <Text>
          Your plan will be changed to 'Free' effective immediately, and you will be
          invoiced at the end of your billing period. If you change your mind, you can
          renew your subscription until the end of your billing period.
        </Text>
      ),
      labels: { cancel: "Cancel", confirm: "Stop subscription" },
      confirmProps: { color: "red" },
      onConfirm: stopSubscription,
    })

  const openRenewSubscriptionModal = () =>
    openConfirmationModal({
      title: <Text fw={600}>Renew Subscription</Text>,
      children: (
        <Text>
          Your plan will be renewed to 'Auto-Scale' effective immediately. You will be
          invoiced at the end of your billing period. If you change your mind, you can
          stop your subscription anytime.
        </Text>
      ),
      labels: { cancel: "Cancel", confirm: "Renew subscription" },
      onConfirm: renewSubscription,
    })

  return (
    <>
      {isPaidPlan(planType) && subscription && (
        <Menu.Item icon={<LuStopCircle size={18} />} onClick={openStopSubscriptionModal}>
          Stop subscription
        </Menu.Item>
      )}

      {!subscription && (isFreePlan(planType) || isLegacyPlan(planType)) && (
        <Menu.Item icon={<LuArrowUpFromLine size={18} />}>
          <Link to={`/api/stripe/checkout-session?app-id=${id}&app-name=${name}`}>
            Upgrade to Auto-Scale
          </Link>
        </Menu.Item>
      )}

      {subscription && subscription.cancel_at_period_end && (
        <Menu.Item icon={<LuRepeat size={18} />} onClick={openRenewSubscriptionModal}>
          Renew subscription
        </Menu.Item>
      )}
    </>
  )
}

export default AppSubscription
