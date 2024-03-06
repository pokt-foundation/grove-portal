import {
  Card,
  Text,
  Button,
  Badge,
  List,
  Stack,
  Title,
  Box,
  MantineTheme,
} from "@mantine/core"
import { LuCheck } from "react-icons/lu"
import { PayPlanType } from "~/models/portal/sdk"

type AccountPlanProps = {
  type: PayPlanType.PayAsYouGoV0 | PayPlanType.FreetierV0 | PayPlanType.Enterprise
  onContinue?: () => void
  disableFree?: boolean
}

const AutoScaleList = () => {
  return (
    <List center icon={<LuCheck size="18px" />} size="sm" spacing="xl">
      <List.Item>100,000 relays free per day</List.Item>
      <List.Item>Auto-Scale at $7.456 / additional million</List.Item>
      <List.Item>No throughput limit</List.Item>
      {/*<List.Item>5 Applications</List.Item>*/}
      {/*<List.Item>10 Team Members</List.Item>*/}
      <List.Item>Direct Customer support</List.Item>
      <List.Item>Access all supported chains</List.Item>
      <List.Item>Global region support</List.Item>
      <List.Item>ETH Trace supported</List.Item>
    </List>
  )
}

const EnterpriseList = () => {
  return (
    <List center icon={<LuCheck size="18px" />} size="sm" spacing="xl">
      <List.Item>Custom relays per day</List.Item>
      <List.Item>Custom volume plans</List.Item>
      <List.Item>No throughput limit</List.Item>
      {/*<List.Item>5 Applications</List.Item>*/}
      {/*<List.Item>10 Team Members</List.Item>*/}
      <List.Item>Direct Customer support</List.Item>
      <List.Item>Access all supported chains</List.Item>
      <List.Item>Global region support</List.Item>
      <List.Item>ETH Trace supported</List.Item>
    </List>
  )
}

const FreeList = () => (
  <List center icon={<LuCheck size="18px" />} size="sm" spacing="xl">
    <List.Item>100,000 relays free per day</List.Item>
    <List.Item>Cap at 100,000 Relays, zero overages</List.Item>
    <List.Item>30 request/sec throughput limit</List.Item>
    {/*<List.Item>2 Applications</List.Item>*/}
    {/*<List.Item>2 Team Members</List.Item>*/}
    <List.Item>Community Discord support</List.Item>
    <List.Item>Access all supported chains</List.Item>
    <List.Item>Global region support</List.Item>
    <List.Item>ETH Trace supported</List.Item>
  </List>
)

export const AccountPlan = ({
  type,
  onContinue,
  disableFree = false,
}: AccountPlanProps) => {
  const isFree = type === PayPlanType.FreetierV0
  const isPAYG = type === PayPlanType.PayAsYouGoV0
  const isEnterprise = type === PayPlanType.Enterprise

  return (
    <Card
      withBorder
      radius="md"
      shadow="sm"
      style={(theme: MantineTheme) => ({
        borderColor: isPAYG ? theme.colors.green[7] : theme.colors.gray[8],
      })}
    >
      <Stack align="center" gap="xl" mb="xl">
        <Badge>
          {isFree && "Builder"}
          {isPAYG && "Pay as you go"}
          {isEnterprise && "Custom"}
        </Badge>
        <Title order={3}>
          {isFree && "Starter"}
          {isPAYG && "Auto-Scale"}
          {isEnterprise && "Enterprise"}
        </Title>
      </Stack>
      <Text py="lg" ta="center">
        {isFree &&
          "For developers looking to get started reading and writing data from any integrated chains."}
        {isPAYG &&
          "For projects needing to scale, pay only for the RPC requests above the free threshold."}
        {isEnterprise &&
          "Drive innovation and partner with the top decentralized infrastructure in all web3."}
      </Text>

      {isFree && (
        <Button
          fullWidth
          color="gray"
          disabled={!!disableFree}
          radius="xl"
          variant="outline"
          onClick={onContinue}
        >
          {disableFree ? "Current plan" : "Continue with Starter"}
        </Button>
      )}
      {isPAYG && (
        <Button fullWidth radius="xl" onClick={onContinue}>
          Continue with Auto-Scale
        </Button>
      )}
      {isEnterprise && (
        <Button fullWidth color="gray" radius="xl" onClick={onContinue}>
          Talk to Sales
        </Button>
      )}

      <Box mt="md">
        {isFree && <FreeList />}
        {isPAYG && <AutoScaleList />}
        {isEnterprise && <EnterpriseList />}
      </Box>
    </Card>
  )
}

export default AccountPlan
