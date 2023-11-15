import { Divider } from "@mantine/core"
import {
  Box,
  CloseButton,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { NavLink, useNavigate, useParams } from "@remix-run/react"
import React from "react"
import invariant from "tiny-invariant"
import { AccountPlan } from "~/components/AccountPlan"
import { initPortalClient } from "~/models/portal/portal.server"
import { PayPlanType, RoleName } from "~/models/portal/sdk"
import { getUserAccountRole } from "~/utils/accountUtils"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { getPlanName } from "~/utils/planUtils"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Upgrade to Auto-Scale ${seo_title_append}`,
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const { accountId } = params
  invariant(accountId, "AccountId must be set")

  const getUserAccountResponse = await portal
    .getUserAccount({ accountID: accountId, accepted: true })
    .catch((e) => {
      console.log(e)
    })

  if (!getUserAccountResponse) {
    return redirect(`/account/${params.accountId}`)
  }

  const userRole = getUserAccountRole(
    getUserAccountResponse.getUserAccount.users,
    user.user.portalUserID,
  )

  if (
    !userRole ||
    userRole === RoleName.Member ||
    getUserAccountResponse.getUserAccount.planType !== PayPlanType.FreetierV0
  ) {
    return redirect(`/account/${params.accountId}`)
  }

  return null
}

export default function UpgradePlan() {
  const { accountId } = useParams()
  const navigate = useNavigate()

  return (
    <Box maw={860} mt={90} mx="auto">
      <Stack align="center" mt={"xl"}>
        <Box w="100%">
          <Group position="apart">
            <Text fw={600} fz="21px">
              Upgrade to Auto-Scale
            </Text>
            <Tooltip withArrow label="Discard" position="bottom">
              <CloseButton
                aria-label="Discard"
                component={NavLink}
                size="lg"
                to={`/account/${accountId}`}
              />
            </Tooltip>
          </Group>
          <Text>Your current plan is {getPlanName(PayPlanType.FreetierV0)}.</Text>
        </Box>
        <Divider mb="md" mt="xl" />
        <SimpleGrid breakpoints={[{ maxWidth: "lg", cols: 1 }]} cols={2}>
          <AccountPlan disableFree type={PayPlanType.FreetierV0} />
          <AccountPlan
            type={PayPlanType.PayAsYouGoV0}
            onContinue={() => {
              trackEvent({
                category: AnalyticCategories.account,
                action: AnalyticActions.account_plan_upgrade,
                label: accountId,
              })
              navigate(`/api/stripe/checkout-session?account-id=${accountId}`)
            }}
          />
        </SimpleGrid>
      </Stack>
    </Box>
  )
}
