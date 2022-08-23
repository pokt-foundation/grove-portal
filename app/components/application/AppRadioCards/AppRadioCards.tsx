import { Text, Radio } from "@mantine/core"
import styles from "./styles.css"
import Grid from "~/components/shared/Grid"
import { useTranslate } from "~/context/TranslateContext"
import clsx from "clsx"

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
    <>
      <Grid align="center" className="radio-card-grid">
        {radioData.map((radio) => (
          <Grid.Col key={radio.name} sm={4} xs={12}>
            <div
              className={clsx(
                "radio-card",
                radio.value === currentRadio ? "active" : null,
              )}
              onClick={() => radio.active === "true" && setRadio(radio.value)}
            >
              <Radio
                readOnly
                checked={radio.value === currentRadio}
                disabled={radio.active != "true"}
                label={radio.name}
                value={radio.name}
              />
              <Text>{radio.priceText}</Text>
              <Text>{radio.cardDescription}</Text>
            </div>
          </Grid.Col>
        ))}
      </Grid>
    </>
  )
}
