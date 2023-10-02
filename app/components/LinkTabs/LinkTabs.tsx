import { Flex, Button, MantineTheme, ScrollArea } from "@pokt-foundation/pocket-blocks"
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
    <ScrollArea mb={"-11px"}>
      <Flex
        gap="xl"
        pb={11}
        sx={(theme: MantineTheme) => ({
          "&::after": {
            content: '""',
            display: "block",
            width: "100%",
            borderBottom: `2px solid ${theme.colors.gray[8]}`,
            position: "absolute",
            bottom: 11,
            opacity: "50%",
          },
        })}
      >
        {routes.map((route, index) => (
          <Button
            key={`${route.to}-${index}`}
            color="gray"
            component={NavLink}
            end={route.end}
            prefetch="intent"
            px={4}
            py={12}
            radius={0}
            sx={(theme) => ({
              transition: "border-bottom 0.3s ease-in-out",
              borderBottom: `2px solid transparent`,
              color: theme.colors.dark[0],
              zIndex: 1,
              "&.active": {
                borderBottom: `2px solid ${theme.colors.gray[0]}`,
                borderRadius: "1px/30%",
                color: theme.colors.gray[0],
              },
              "&:hover": {
                backgroundColor: "transparent",
                color: theme.colors.gray[0],
              },
            })}
            to={route.to}
            variant="subtle"
          >
            {route.label}
          </Button>
        ))}
      </Flex>
    </ScrollArea>
  )
}

export default LinkTabs
