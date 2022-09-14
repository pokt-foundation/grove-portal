import { Button } from "@pokt-foundation/pocket-blocks"
import { useTheme } from "@pokt-foundation/ui"
import Advertisement, {
  links as AdvertisementLinks,
} from "~/components/shared/Advertisement"

const ECONOMICS_URL = "https://docs.pokt.network/learn/economics/apps/"

/* c8 ignore start */
export const links = () => {
  return [...AdvertisementLinks()]
}
/* c8 ignore stop */

export default function AdEconomicsForDevs() {
  const theme = useTheme()
  return (
    <Advertisement
      action={
        <Button
          className="pokt-ad-action"
          component="a"
          href={ECONOMICS_URL}
          rel="noreferrer"
          target="_blank"
        >
          Read More
        </Button>
      }
      content={
        <h3>
          Pocket Economics for <span>App Developers</span>
        </h3>
      }
      styles={{
        backgroundImage: `url('/economicsDevs.png'), linear-gradient(180deg, ${theme.surfaceGradient1} 0%, ${theme.surfaceGradient2} 100%)`,
      }}
    />
  )
}
