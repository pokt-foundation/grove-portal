import { Box, Center, Flex, Text } from "@pokt-foundation/pocket-blocks"
import { AccountPlan } from "~/components/AccountPlan"
import { PayPlanType } from "~/models/portal/sdk"

type AccountPlansContainerProps = {
  onPlanSelected: (plan: PayPlanType.FreetierV0 | PayPlanType.PayAsYouGoV0) => void
}

const AccountPlansContainer = ({ onPlanSelected }: AccountPlansContainerProps) => {
  return (
    <Box>
      <Text fz="21px" mb="48px" mt="xl">
        Choose a plan for your application New Application
      </Text>
      <Flex justify="space-evenly">
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
        <Text fz="xs">
          All prices are in USD and are charged per organization with applicable taxes.
        </Text>
      </Center>
    </Box>
  )
}

export default AccountPlansContainer
