import { Card, CardProps } from "@mantine/core"
import React, { ReactNode } from "react"

export type TitledCardPropsType = {
  children: ReactNode
  header?: () => JSX.Element
}

export const TitledCard: React.FC<TitledCardPropsType> = ({
  children,
  header,
  withBorder = true,
  ...rest
}: TitledCardPropsType & CardProps) => {
  return (
    <Card radius="sm" withBorder={withBorder} {...rest}>
      {header && (
        <Card.Section inheritPadding withBorder py="xs">
          {header()}
        </Card.Section>
      )}
      {children}
    </Card>
  )
}

export default TitledCard
