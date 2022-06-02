import { useFetcher } from "@remix-run/react"
import Container from "~/components/shared/Container"
import { useFeatureFlags } from "~/context/FeatureFlagContext"

export default function FeatureFlags() {
  const fetcher = useFetcher()
  const { flags } = useFeatureFlags()

  return (
    <Container>
      <fetcher.Form method="post" action="/api/featureflags">
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
