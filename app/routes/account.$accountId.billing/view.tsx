import { Container } from "@mantine/core"
import React from "react"

type AccountBillingLayoutViewProps = {
  children: React.ReactNode
}

export default function AccountBillingLayoutView({
  children,
}: AccountBillingLayoutViewProps) {
  return (
    <Container fluid px={0}>
      {children}
    </Container>
  )
}
