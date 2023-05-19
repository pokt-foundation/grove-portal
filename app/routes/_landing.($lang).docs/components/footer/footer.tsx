import { Flex } from "@mantine/core"
import { Divider, IconCaretLeft, IconCaretRight } from "@pokt-foundation/pocket-blocks"
import { Link, useLocation } from "@remix-run/react"
import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"
import { getNextAndPrevNodesInTree } from "~/utils/docs"

interface DocsFooterProps {
  items: LinksGroupProps[]
}

function DocsFooter({ items }: DocsFooterProps) {
  const location = useLocation()
  const splittedPath = location.pathname.split("/")
  const [prev, next] = getNextAndPrevNodesInTree(
    items,
    items.find((ft) => splittedPath[splittedPath.length - 1] === ft.slug),
  )

  return (
    <Flex direction="column">
      <Divider color="gray" mb="sm" mt="xl" sx={{ borderTopWidth: "0.03rem" }} />

      <Flex direction="row" justify="space-between">
        {prev && (
          <Link style={{ display: "flex", alignSelf: "flex-end" }} to={prev.link}>
            <IconCaretLeft />
            {prev.label}
          </Link>
        )}
        {next && (
          <Link style={{ display: "flex", alignSelf: "flex-end" }} to={next.link}>
            {next.label}
            <IconCaretRight />
          </Link>
        )}
      </Flex>
    </Flex>
  )
}

export default DocsFooter
