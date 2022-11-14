import { Grid, List } from "@pokt-foundation/pocket-blocks"
import HelpTooltip, { links as HelpTooltipLinks } from "../HelpTooltip"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [...HelpTooltipLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

type CardListProps = {
  items: CardListItem[]
}

export type CardListItem = {
  label: string
  value: string | number
  help?: string
  color?: "primary" | "secondary" | "success" | "error"
  icon?: React.ReactNode
}

export const CardList = ({ items }: CardListProps) => {
  return (
    <List className="pokt-card-list">
      {items.map((item) => (
        <List.Item key={item.label}>
          <Grid>
            <Grid.Col span={6}>
              <div className="pokt-list-label">
                <p>{item.label}</p>
                {item.help && <HelpTooltip label={item.help} />}
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <p className={`pokt-list-value ${item.color ?? ""}`}>
                {item.icon && (
                  <span className="pokt-list-icon">
                    {/* @ts-ignore eslint-disable-next-line */}
                    <item.icon />
                  </span>
                )}
                {item.value}
              </p>
            </Grid.Col>
          </Grid>
        </List.Item>
      ))}
    </List>
  )
}

export default CardList
