import { Flex, Button } from "@pokt-foundation/pocket-blocks"
import { NavLink } from "@remix-run/react"
import React from "react"

export type TabRoute = {
  to: string
  label?: string
  icon?: React.ReactNode | (() => JSX.Element) | React.FunctionComponent
  end?: boolean
  external?: boolean
}

type LinkTabsProps = {
  routes: TabRoute[]
}

const LinkTabs = ({ routes }: LinkTabsProps) => {
  return (
    <Flex gap="xs">
      {routes.map((route, index) => (
        <Button
          key={`${route.to}-${index}`}
          color="gray"
          component={NavLink}
          end={route.end}
          prefetch="intent"
          sx={(theme) => ({
            transition: "color 0.3s ease-in-out",
            "&.active": {
              backgroundColor: theme.colors.dark[7],
              fontWeight: 600,
            },
          })}
          to={route.to}
          variant="subtle"
        >
          {route.label}
        </Button>
      ))}
    </Flex>
  )
}

export default LinkTabs
