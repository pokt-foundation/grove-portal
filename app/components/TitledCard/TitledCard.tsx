import { Card, CardProps } from "@mantine/core"
import React, { ReactNode } from "react"

export type TitledCardPropsType = {
  children: ReactNode
  header: () => JSX.Element
}

export const TitledCard: React.FC<TitledCardPropsType> = ({
  children,
  header,
  withBorder = true,
  ...rest
}: TitledCardPropsType & CardProps) => {
  return (
    <Card radius="sm" shadow="sm" withBorder={withBorder} {...rest}>
      <Card.Section inheritPadding withBorder py="xs">
        {header && header()}
      </Card.Section>
      {children}
    </Card>
  )
}

export default TitledCard
