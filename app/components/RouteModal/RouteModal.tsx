import {
  Box,
  CloseButton,
  Container,
  Flex,
  LoadingOverlay,
  Text,
  Tooltip,
} from "@mantine/core"
import { FetcherWithComponents, NavLink } from "@remix-run/react"
import React, { ReactNode } from "react"
import PortalLoader from "~/components/PortalLoader"

type RouteModalProps = {
  state: FetcherWithComponents<any>["state"]
  children: ReactNode
  loaderMessage: string
}

const RouteModal = ({ state, children, loaderMessage }: RouteModalProps) => {
  return state === "idle" ? (
    <Container p="xl" size="md">
      <Box mt={{ base: 0, sm: 90 }}>{children}</Box>
    </Container>
  ) : (
    <LoadingOverlay
      visible
      loaderProps={{
        children: <PortalLoader message={loaderMessage} />,
      }}
    />
  )
}

type RouteModalHeaderProps = {
  title: string
  description?: string
  closeButtonLink: string
}
const Header = ({ title, description, closeButtonLink }: RouteModalHeaderProps) => (
  <Box>
    <Flex align="center" justify="space-between" my="32px">
      <Text fw={600} fz="21px">
        {title}
      </Text>
      <Tooltip withArrow label="Close">
        <CloseButton aria-label="Close" component={NavLink} to={closeButtonLink} />
      </Tooltip>
    </Flex>
    {description ? <Text>{description}</Text> : null}
  </Box>
)

Header.displayName = "RouteModalHeader"

RouteModal.Header = Header

export default RouteModal
