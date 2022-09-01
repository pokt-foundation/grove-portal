import { useFetcher } from "@remix-run/react"
import { Container } from "@pokt-foundation/pocket-blocks"
import { useFeatureFlags } from "~/context/FeatureFlagContext"

export default function FeatureFlags() {
  const fetcher = useFetcher()
  const { flags } = useFeatureFlags()

  return (
    <Container size="lg">
      <fetcher.Form action="/api/featureflags" method="post">
        {Object.entries(flags).map(([key, value]) => (
          <fieldset key={key}>
            <label>{key}: </label>
            <input name={key} placeholder={value} />
          </fieldset>
        ))}
        <button type="submit">Submit</button>
      </fetcher.Form>
    </Container>
  )
}
