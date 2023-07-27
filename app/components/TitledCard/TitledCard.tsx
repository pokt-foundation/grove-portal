import { Card, CardProps, createStyles } from "@pokt-foundation/pocket-blocks"
import React, { ReactNode } from "react"

export type TitledCardPropsType = {
  children: ReactNode
  header: () => JSX.Element
}

const useStyles = createStyles((theme) => ({
  cardHeader: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[4],
  },
}))

export const TitledCard: React.FC<TitledCardPropsType> = ({
  children,
  header,
  withBorder = true,
  ...rest
}: TitledCardPropsType & CardProps) => {
  const { classes } = useStyles()

  return (
    <Card radius="sm" shadow="sm" withBorder={withBorder} {...rest}>
      <Card.Section inheritPadding withBorder className={classes.cardHeader} py="xs">
        {header && header()}
      </Card.Section>
      {children}
    </Card>
  )
}

export default TitledCard
