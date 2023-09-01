import { Table } from "@mantine/core"
import { BlockchainsQuery } from "~/models/portal/sdk"
import AppEndpoint from "~/routes/account.$accountId.$appId._index/components/AppEndpoint/AppEndpoint"

type AppEndpointsProps = { blockchains: BlockchainsQuery["blockchains"] }

const AppEndpointsContainer = ({ blockchains }: AppEndpointsProps) => {
  return (
    <Table miw={800} verticalSpacing="xl">
      <tbody>
        {blockchains.map((blockchain) => (
          <AppEndpoint key={blockchain?.id} chain={blockchain} />
        ))}
      </tbody>
    </Table>
  )
}

export default AppEndpointsContainer
