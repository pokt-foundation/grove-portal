import { Stack, Anchor, Text } from "@pokt-foundation/pocket-blocks"
import { documentation } from "~/models/cms/sdk"
import { getHeadersFromMarkdown, transformHeaderToAnchor } from "~/utils/docs"

type DocAsideProps = {
  doc: documentation
}

export const DocAside = ({ doc }: DocAsideProps) => {
  const { translations } = doc

  const body =
    translations && translations[0] && translations[0].body ? translations[0].body : ""
  const headers = getHeadersFromMarkdown(body)

  return headers && headers?.length > 0 ? (
    <Stack pos="sticky" top={20}>
      <Text mt={10} size="xl">
        On this page
      </Text>
      {headers.map((header) => (
        <Anchor
          key={header}
          color="#86BEF7"
          href={`#${transformHeaderToAnchor(header)}`}
          size="lg"
        >
          {header.replace(/^#+/, "")}
        </Anchor>
      ))}
    </Stack>
  ) : null
}

export default DocAside
