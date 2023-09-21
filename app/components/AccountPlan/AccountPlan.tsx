import {
  Card,
  Text,
  Button,
  Badge,
  List,
  useMantineTheme,
  Stack,
  Title,
  Box,
  MantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { LuCheck } from "react-icons/lu"
import { PayPlanTypeV2 } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"

type AccountPlanProps = {
  type: PayPlanTypeV2.PayAsYouGoV0 | PayPlanTypeV2.FreetierV0
  onContinue?: () => void
  disableFree?: boolean
}

const AutoScaleList = () => {
  const theme = useMantineTheme()

  return (
    <List
      center
      icon={<LuCheck color={theme.colors.blue[7]} size="18px" />}
      size="sm"
      spacing="xl"
    >
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
  const isFree = type === PayPlanTypeV2.FreetierV0
  const { classes: commonClasses } = useCommonStyles()

  return (
    <Card
      withBorder
      radius="md"
      shadow="sm"
      sx={(theme: MantineTheme) => ({
        ...(theme.colorScheme === "dark" && {
          borderColor: isFree ? theme.colors.gray[8] : theme.colors.green[7],
        }),
        ...(theme.colorScheme === "light" && {
          borderColor: isFree ? theme.colors.gray[3] : theme.colors.green[7],
        }),
      })}
      w="360px"
    >
      <Stack align="center" mb="xl" spacing="xl">
        <Badge>{isFree ? "Builder" : "Pay as you go"}</Badge>
        <Title order={3}>{isFree ? "Free" : "Auto-Scale"}</Title>
      </Stack>
      <Text align="center" py="lg">
        {isFree
          ? "For developers looking to get started reading and writing data from any integrated chains."
          : "For projects needing to scale, pay only for the RPC requests above the free threshold."}
      </Text>

      {isFree ? (
        <Button
          fullWidth
          classNames={{ root: commonClasses.grayOutlinedButton }}
          color="gray"
          disabled={disableFree}
          radius="xl"
          variant="outline"
          onClick={onContinue}
        >
          {disableFree ? "Current plan" : "Continue with Free"}
        </Button>
      ) : (
        <Button fullWidth radius="xl" onClick={onContinue}>
          Continue with Auto-Scale
        </Button>
      )}

      <Box mt="md">{isFree ? <FreeList /> : <AutoScaleList />}</Box>
    </Card>
  )
}

export default AccountPlan
