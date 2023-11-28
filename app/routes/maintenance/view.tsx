import { Container, Stack, Text } from "@pokt-foundation/pocket-blocks"
import React from "react"
import PortalLoader from "~/components/PortalLoader"
export function PortalMaintenanceView() {
  return (
    <Container mt={120}>
      <Stack align="center" justify="center">
        <PortalLoader />
        <Text fw={600} fz="xl" ta="center">
          Scheduled Maintenance
        </Text>
        <Text fw={400} fz="sm" maw={510} ta="center">
          Our platform is currently undergoing scheduled maintenance today. During this
          time, the Portal UI is temporarily unavailable, and users are unable to create
          or edit applications, adjust security settings, or pay plans. However, rest
          assured that all relay requests are being processed as usual.
        </Text>
      </Stack>
    </Container>
  )
}
