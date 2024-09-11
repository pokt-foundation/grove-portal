import { Box, Center, Flex, Text } from "@mantine/core"

import { AccountPlan } from "~/components/AccountPlan"
import { PayPlanType } from "~/models/portal/sdk"
import RouteModal from "~/components/RouteModal"
import { useParams } from "@remix-run/react"

type AccountPlansContainerProps = {
  onPlanSelected: (plan: PayPlanType.PlanFree | PayPlanType.PlanUnlimited) => void
}

const AccountPlansContainer = ({ onPlanSelected }: AccountPlansContainerProps) => {
  const { accountId } = useParams()

  return (
    <Box>
      <RouteModal.Header
        closeButtonLink={`/account/${accountId}`}
        title="Choose an account plan"
      />
      <Flex gap="xl" justify="space-evenly">
        <AccountPlan
          type={PayPlanType.PlanFree}
          onContinue={() => onPlanSelected(PayPlanType.PlanFree)}
        />
        <AccountPlan
          type={PayPlanType.PlanUnlimited}
          onContinue={() => onPlanSelected(PayPlanType.PlanUnlimited)}
        />
      </Flex>
      <Center mt="xl">
        <Text fz="xs">All prices are in USD and are charged per application.</Text>
      </Center>
    </Box>
  )
}

export default AccountPlansContainer
