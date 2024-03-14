import { Box, Center, Flex, Text } from "@mantine/core"
import { useParams } from "@remix-run/react"
import { AccountPlan } from "~/components/AccountPlan"
import RouteModal from "~/components/RouteModal"
import { PayPlanType } from "~/models/portal/sdk"

type AccountPlansContainerProps = {
  onPlanSelected: (plan: PayPlanType.FreetierV0 | PayPlanType.PayAsYouGoV0) => void
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
          type={PayPlanType.FreetierV0}
          onContinue={() => onPlanSelected(PayPlanType.FreetierV0)}
        />
        <AccountPlan
          type={PayPlanType.PayAsYouGoV0}
          onContinue={() => onPlanSelected(PayPlanType.PayAsYouGoV0)}
        />
      </Flex>
      <Center mt="xl">
        <Text fz="xs">All prices are in USD and are charged per application.</Text>
      </Center>
    </Box>
  )
}

export default AccountPlansContainer
