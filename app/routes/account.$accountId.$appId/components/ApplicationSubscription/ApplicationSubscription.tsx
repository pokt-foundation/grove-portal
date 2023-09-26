import { Menu } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { LuArrowUpFromLine, LuRepeat, LuStopCircle } from "react-icons/lu"
import { PortalApp } from "~/models/portal/sdk"
import useSubscriptionModals from "~/routes/account.$accountId.$appId/hooks/useSubscriptionModals"
import { isFreePlan, isLegacyPlan, isPaidPlan } from "~/utils/utils"

type AppSubscriptionProps = {
  app: PortalApp
}

const ApplicationSubscription = ({ app }: AppSubscriptionProps) => {
  const planType = app.legacyFields.planType
  const subscriptionId = app.legacyFields.stripeSubscriptionID

  const { openStopSubscriptionModal, openRenewSubscriptionModal } =
    useSubscriptionModals()

  return (
    <>
      {isPaidPlan(planType) && subscriptionId && (
        <Menu.Item
          icon={<LuStopCircle size={18} />}
          onClick={() => openStopSubscriptionModal(app)}
        >
          Stop subscription
        </Menu.Item>
      )}

      {!subscriptionId && (isFreePlan(planType) || isLegacyPlan(planType)) && (
        <Menu.Item icon={<LuArrowUpFromLine size={18} />}>
          <Link
            to={`/api/stripe/checkout-session?app-id=${app.id}&app-accountId=${app.accountID}&app-name=${app.name}`}
          >
            Upgrade to Auto-Scale
          </Link>
        </Menu.Item>
      )}

      {isFreePlan(planType) && subscriptionId && (
        <Menu.Item
          icon={<LuRepeat size={18} />}
          onClick={() => openRenewSubscriptionModal(app)}
        >
          Renew subscription
        </Menu.Item>
      )}
    </>
  )
}

export default ApplicationSubscription
