import {
  Group,
  Avatar,
  Text,
  ActionIcon,
  TextInput,
  Stack,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { useParams } from "@remix-run/react"
import { LuMoreHorizontal } from "react-icons/lu"
import { RiStarLine } from "react-icons/ri"
import CopyTextButton from "~/components/CopyTextButton"
import { Blockchain } from "~/models/portal/sdk"

type AppEndpointProps = { chain: Blockchain | undefined | null }

const AppEndpoint = ({ chain }: AppEndpointProps) => {
  const { appId } = useParams()
  const theme = useMantineTheme()

  const appEndpointUrl = `https://${chain?.blockchain}.gateway.pokt.network/v1/lb/${appId}`
  return (
    <tr>
      <td style={{ minWidth: "340px", width: "35%" }}>
        <Group spacing="sm">
          <ActionIcon c="gray" size="xl">
            <RiStarLine size={18} />
          </ActionIcon>
          <Avatar radius={40} size={40} src="/avalanche-avax-logo.png" />
          <Stack spacing={0} w={200}>
            <Text truncate fw={600}>
              {chain?.description}
            </Text>
            <Text c="dimmed" fz="xs">
              {chain?.blockchain}
            </Text>
          </Stack>
        </Group>
      </td>

      <td>
        <TextInput bg={theme.colors.gray[9]} value={appEndpointUrl} />
      </td>
      <td style={{ minWidth: "130px" }} width="130px">
        <Group spacing="lg">
          <CopyTextButton value={appEndpointUrl} />
          <ActionIcon radius="xl" size={40} variant="outline">
            <LuMoreHorizontal />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  )
}

export default AppEndpoint
