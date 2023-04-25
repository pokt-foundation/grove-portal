import { Text, Radio, Grid, Box } from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import styles from "./styles.css"
import { useFeatureFlags } from "~/context/FeatureFlagContext"
import { useTranslate } from "~/context/TranslateContext"
import { PayPlanType } from "~/models/portal/sdk"

/* c8 ignore next */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface AppRadioCardsProps {
  radioData: {
    name: string
    value: string
    active: string
    price?: number | string
    priceText?: string
    cardDescription: string
  }[]
  currentRadio: string
  setRadio: Function
}

export default function AppRadioCards({
  radioData,
  setRadio,
  currentRadio,
}: AppRadioCardsProps) {
  const { t } = useTranslate()
  const { flags } = useFeatureFlags()

  return (
    <Grid align="center" className="radio-card-grid">
      {radioData.map((radio) => (
        <Grid.Col
          key={radio.name}
          className={clsx({
            "radio-card-grid__col": true,
            "order-first":
              flags.STRIPE_PAYMENT && radio.value === PayPlanType.PayAsYouGoV0,
          })}
          sm={12 / radioData.length}
          xs={12}
        >
          <Box
            className={clsx(
              "radio-card",
              radio.value === currentRadio ? "active" : null,
              { disabled: radio.active === "false" },
            )}
            sx={(theme) => ({
              borderColor:
                theme.colorScheme === "dark" ? theme.colors.gray : theme.colors.dark,
              "&.active": {
                borderColor: theme.colors[theme.primaryColor][6],
              },
              "&.disabled": {
                borderColor: theme.colors.gray[6],
              },
              "&.disabled input": {
                color: theme.colors.gray[6],
              },
              "&.disabled input[type='radio']": {
                borderColor: theme.colors.gray[6],
                backgroundColor: theme.colors.gray[6],
              },
            })}
            // @ts-ignore: next
            onClick={() => radio.active === "true" && setRadio(radio.value)}
          >
            <div className="flexRow">
              <Radio
                checked={radio.value === currentRadio}
                disabled={radio.active !== "true"}
                label={radio.name}
                name="app-subscription"
                value={radio.value}
              />
              {radio.priceText && (
                <Text>
                  {radio.active === "true" ? radio.priceText : t.common.unavailable}
                </Text>
              )}
            </div>
            <Text>{radio.cardDescription}</Text>
          </Box>
        </Grid.Col>
      ))}
    </Grid>
  )
}
