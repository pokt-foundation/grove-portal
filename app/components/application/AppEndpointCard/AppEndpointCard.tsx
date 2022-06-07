import { Card, links as CardLinks } from "~/components/shared/Card"
import ChainWithImage, {
  links as ChainWithImageLinks,
} from "~/components/application/ChainWithImage"
import styles from "./styles.css"
import { UserLB } from "~/models/portal.server"
import { ChainMetadata, prefixFromChainId } from "~/utils/chainUtils"
import AppEndpointUrl, {
  links as AppEndpointUrlLinks,
} from "~/components/application/AppEndpointUrl"
import Button from "~/components/shared/Button"
import { IconPlus } from "@pokt-foundation/ui"

export const links = () => {
  return [
    ...CardLinks(),
    ...ChainWithImageLinks(),
    ...AppEndpointUrlLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

interface AppEndpointProps {
  app: UserLB
}

export default function AppEndpointCard({ app }: AppEndpointProps) {
  const chains = app.chain ? [app.chain] : ["0021"]
  const { name: chainDescription } = app.chain
    ? (prefixFromChainId(chains[0]) as ChainMetadata)
    : { name: "" }

  return (
    <div className="pokt-app-endpoint">
      <Card>
        <div className="pokt-app-endpoint-header">
          <h3>Endpoint</h3>
          <div>
            {app.gigastake ? (
              <Button>
                Add New <IconPlus />
              </Button>
            ) : (
              <ChainWithImage chain={chainDescription} />
            )}
          </div>
        </div>
        {chains &&
          chains.map((chain) => (
            <AppEndpointUrl key={chain} chainId={chain} appId={app.id} />
          ))}
      </Card>
    </div>
  )
}
