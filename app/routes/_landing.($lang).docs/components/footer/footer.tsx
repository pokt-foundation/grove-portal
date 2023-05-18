import { Flex } from "@mantine/core"
import { Divider, IconCaretRight } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"

interface DocsFooterProps {
  nextDoc: LinksGroupProps
}

function DocsFooter({ nextDoc }: DocsFooterProps) {
  return (
    <Flex direction="column">
      <Divider color="gray" mb="sm" mt="xl" sx={{ borderTopWidth: "0.03rem" }} />
      <Link style={{ display: "flex", alignSelf: "flex-end" }} to={nextDoc.link}>
        {nextDoc.label}
        <IconCaretRight />
      </Link>
    </Flex>
  )
}

export default DocsFooter
