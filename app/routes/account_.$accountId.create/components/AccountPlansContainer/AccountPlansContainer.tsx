import { Box, Center, CloseButton, Flex, Text, Tooltip } from "@mantine/core"
import { NavLink, useParams } from "@remix-run/react"
import { AccountPlan } from "~/components/AccountPlan"
import { PayPlanType } from "~/models/portal/sdk"

type AccountPlansContainerProps = {
  onPlanSelected: (plan: PayPlanType.FreetierV0 | PayPlanType.PayAsYouGoV0) => void
}

const AccountPlansContainer = ({ onPlanSelected }: AccountPlansContainerProps) => {
  const { accountId } = useParams()

  return (
    <Box>
      <Flex align="center" justify="space-between" my="32px">
        <Text fw={600} fz="21px">
          Choose an application plan
        </Text>
        <Tooltip withArrow label="Discard" position="bottom">
          <CloseButton
            aria-label="Discard"
            component={NavLink}
            size="lg"
            to={`/account/${accountId}`}
          />
        </Tooltip>
      </Flex>

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
