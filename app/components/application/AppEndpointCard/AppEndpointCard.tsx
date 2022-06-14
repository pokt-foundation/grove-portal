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
import { useUser } from "~/context/UserContext"
import Dropdown, { DropdownMenu } from "~/components/shared/Dropdown"
import { useEffect } from "react"

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
  const { user, submit } = useUser()

  useEffect(() => {
    if (app.id && !user.preferences.endpoints) {
      submit({
        endpoints: JSON.stringify({
          [app.id]: JSON.stringify(app.chain ? [app.chain] : ["0021"]),
        }),
      })
    }
  }, [app, user, submit])

  return (
    <div className="pokt-app-endpoint">
      <Card>
        <div className="pokt-card-header">
          <h3>Endpoint</h3>
          <div>
            {app.gigastake ? (
              <Dropdown label="Add New">
                <DropdownMenu.Label>Chains</DropdownMenu.Label>
                <DropdownMenu.Item>Chain 1</DropdownMenu.Item>
              </Dropdown>
            ) : (
              // <Button>
              //   Add New <IconPlus />
              // </Button>
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
