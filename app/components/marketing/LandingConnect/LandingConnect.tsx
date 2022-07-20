import Title, { links as TitleLinks } from "~/components/shared/Title"
import Text, { links as TextLinks } from "~/components/shared/Text"
import Button from "~/components/shared/Button"
import { Link } from "@remix-run/react"
import { useTranslate } from "~/context/TranslateContext"
import styles from "./styles.css"
import Group from "~/components/shared/Group"

export const links = () => {
  return [...TitleLinks(), ...TextLinks(), { rel: "stylesheet", href: styles }]
}

export default function LandingConnect() {
  const { t } = useTranslate()

  return (
    <div>
      <div className="pokt-landing-header">
        <Title order={5} className="pokt-pre-title">
          COMMUNITY
        </Title>
        <Group position="apart">
          <Title order={2} className="pokt-title">
            Do you still have{" "}
            <Text component="span" weight={900} color="blue">
              some questions?
            </Text>
          </Title>
          <Button component={Link} to="">
            Chat with us
          </Button>
        </Group>
      </div>
    </div>
  )
}
