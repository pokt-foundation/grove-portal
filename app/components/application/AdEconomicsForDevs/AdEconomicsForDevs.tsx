import { useTheme } from "@pokt-foundation/ui"
import Advertisement, {
  links as AdvertisementLinks,
} from "~/components/shared/Advertisement"
import Button from "~/components/shared/Button"

export const links = () => {
  return [...AdvertisementLinks()]
}

export default function AdEconomicsForDevs() {
  const theme = useTheme()
  return (
    <Advertisement
      action={
        <Button
          className="pokt-ad-action"
          component="a"
          href="https://medium.com/pocket-network/pocket-economics-for-app-developers-487a6ce290c2"
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
