import { Button, Checkbox, Container } from "@pokt-foundation/pocket-blocks"
import { LinksFunction } from "@remix-run/node"
import { useFetcher } from "@remix-run/react"
import Card, { links as CardLinks } from "~/components/shared/Card"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"
import { useFeatureFlags } from "~/context/FeatureFlagContext"

export const links: LinksFunction = () => [...CardLinks(), ...CardListLinks()]

export default function FeatureFlags() {
  const fetcher = useFetcher()
  const { flags } = useFeatureFlags()
  //@ts-ignore next
  const items: CardListItem[] = Object.entries(flags).map(([key, value]) => ({
    label: key,
    value: <Checkbox defaultChecked={value === "true"} name={key} />,
  }))

  return (
    <Container size="lg">
      <Card>
        <div className="pokt-card-header">
          <h3>Test Feature Flags</h3>
        </div>
        <fetcher.Form action="/api/featureflags" method="post">
          <CardList items={items} />
          <Button mt={16} type="submit">
            Submit
          </Button>
        </fetcher.Form>
      </Card>
    </Container>
  )
}
