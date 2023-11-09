import { Text } from "@pokt-foundation/pocket-blocks"
import { useFetcher } from "@remix-run/react"
import useModals from "~/hooks/useModals"
import { Account } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

const useSubscriptionModals = () => {
  const fetcher = useFetcher()
  const { openConfirmationModal } = useModals()

  const stopSubscription = (account: Account) => {
    fetcher.submit(
      {
        "account-id": account.id,
      },
      {
        method: "POST",
        action: "/api/stripe/subscription",
      },
    )
  }

  const renewSubscription = (account: Account) => {
    fetcher.submit(
      {
        "account-id": account.id,
        "subscription-renew": "true",
      },
      {
        method: "POST",
        action: "/api/stripe/subscription",
      },
    )
  }

  const openStopSubscriptionModal = (account: Account) =>
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
      onConfirm: () => {
        stopSubscription(account)
        trackEvent({
          category: AnalyticCategories.account,
          action: AnalyticActions.account_subscription_stop,
          label: account.id,
        })
      },
    })

  const openRenewSubscriptionModal = (account: Account) =>
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
      onConfirm: () => {
        renewSubscription(account)
        trackEvent({
          category: AnalyticCategories.account,
          action: AnalyticActions.account_subscription_renew,
          label: account.id,
        })
      },
    })

  return { openStopSubscriptionModal, openRenewSubscriptionModal }
}

export default useSubscriptionModals
