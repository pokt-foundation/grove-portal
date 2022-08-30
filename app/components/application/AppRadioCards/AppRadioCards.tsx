import { Text, Radio } from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import styles from "./styles.css"
import Grid from "~/components/shared/Grid"
import { useTranslate } from "~/context/TranslateContext"

/* c8 ignore next */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface AppRadioCardsProps {
  radioData: {
    name: string
    value: string
    active: string
    price: number | string
    priceText: string
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
  const {
    t: { AppPlansOverview },
  } = useTranslate()

  return (
    <Grid align="center" className="radio-card-grid">
      {radioData.map((radio) => (
        <Grid.Col key={radio.name} sm={12 / radioData.length} xs={12}>
          <div
            className={clsx("radio-card", radio.value === currentRadio ? "active" : null)}
            onClick={() => radio.active === "true" && setRadio(radio.value)}
          >
            <div className="flexRow">
              <Radio
                checked={radio.value === currentRadio}
                disabled={radio.active != "true"}
                label={radio.name}
                name="app-subscription"
                value={radio.value}
              />
              <Text>{radio.priceText}</Text>
            </div>
            <Text>{radio.cardDescription}</Text>
          </div>
        </Grid.Col>
      ))}
    </Grid>
  )
}
