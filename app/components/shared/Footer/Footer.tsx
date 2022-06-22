import styles from "./styles.css"
import Button from "~/components/shared/Button"
import { Grid } from "~/components/shared/Grid"
import { Group } from "~/components/shared/Group"
import { useTranslate, Language } from "~/context/TranslateContext"
import { useUser } from "~/context/UserContext"
import { useFeatureFlags } from "~/context/FeatureFlagContext"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const Footer = () => {
  const { flags } = useFeatureFlags()
  const { submit } = useUser()
  const { language, languages } = useTranslate()

  const handleLanguageChange = (l: Language) => {
    submit({
      language: l,
    })
  }

  return (
    <footer className="pokt-footer">
      <Grid>
        <Grid.Col span={12}>
          {flags.MULTI_LANGUAGE === "true" && (
            <Group>
              {language &&
                languages &&
                languages.map((l) => (
                  <Button
                    key={l}
                    value={l}
                    color={l === language ? "primary" : "gray"}
                    onClick={() => handleLanguageChange(l)}
                  >
                    {l}
                  </Button>
                ))}
            </Group>
          )}
        </Grid.Col>
      </Grid>
    </footer>
  )
}

export default Footer
