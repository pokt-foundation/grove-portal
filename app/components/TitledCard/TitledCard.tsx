import { Card, CardProps, createStyles } from "@mantine/core"
import React, { ReactNode } from "react"

export type TitledCardPropsType = {
  children: ReactNode
  header: () => JSX.Element
}

const useStyles = createStyles((theme) => ({
  cardHeader: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.gray[9] : theme.colors.gray[4],
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
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
