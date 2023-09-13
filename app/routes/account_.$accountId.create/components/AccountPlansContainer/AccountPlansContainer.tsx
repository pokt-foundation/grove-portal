import {
  Box,
  Center,
  CloseButton,
  Flex,
  Text,
  Tooltip,
} from "@pokt-foundation/pocket-blocks"
import { NavLink, useParams } from "@remix-run/react"
import { AccountPlan } from "~/components/AccountPlan"
import { PayPlanTypeV2 } from "~/models/portal/sdk"

type AccountPlansContainerProps = {
  onPlanSelected: (plan: PayPlanTypeV2.FreetierV0 | PayPlanTypeV2.PayAsYouGoV0) => void
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

      <Flex justify="space-evenly">
        <AccountPlan
          type={PayPlanTypeV2.FreetierV0}
          onContinue={() => onPlanSelected(PayPlanTypeV2.FreetierV0)}
        />
        <AccountPlan
          type={PayPlanTypeV2.PayAsYouGoV0}
          onContinue={() => onPlanSelected(PayPlanTypeV2.PayAsYouGoV0)}
        />
      </Flex>
      <Center mt="xl">
        <Text fz="xs">All prices are in USD and are charged per application.</Text>
      </Center>
    </Box>
  )
}

export default AccountPlansContainer
