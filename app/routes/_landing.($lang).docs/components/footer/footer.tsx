import { Flex, MantineTheme } from "@mantine/core"
import {
  Anchor,
  Divider,
  IconCaretLeft,
  IconCaretRight,
} from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { useMemo } from "react"
import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"
import { getNextAndPrevNodesInTree } from "~/utils/docs"

interface DocsFooterProps {
  items: LinksGroupProps[]
  pathname: string
}

const commonLinkStyles = (_: MantineTheme) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.625rem",
  width: "228px",
  color: "white",
  borderRadius: "0.5rem",
  "&:hover": {
    backgroundColor: "#192430",
    textDecoration: "none",
  },
})

function DocsFooter({ items, pathname }: DocsFooterProps) {
  const lastPathPart = pathname.split("/").pop()
  const [prev, next] = useMemo(
    () =>
      getNextAndPrevNodesInTree(
        items,
        items.find((ft) => lastPathPart === ft.slug),
      ),
    [items, lastPathPart],
  )

  let justify = "flex-end"
  if (prev && next) {
    justify = "space-between"
  } else if (prev) {
    justify = "flex-start"
  }

  return (
    <Flex direction="column">
      <Divider color="gray" mb="sm" mt="xl" sx={{ borderTopWidth: "0.03rem" }} />
      <Flex direction="row" justify={justify}>
        {prev && (
          <Anchor component={Link} prefetch="intent" sx={commonLinkStyles} to={prev.link}>
            <IconCaretLeft />
            {prev.label}
          </Anchor>
        )}
        {next && (
          <Anchor component={Link} prefetch="intent" sx={commonLinkStyles} to={next.link}>
            {next.label}
            <IconCaretRight />
          </Anchor>
        )}
      </Flex>
    </Flex>
  )
}

export default DocsFooter
