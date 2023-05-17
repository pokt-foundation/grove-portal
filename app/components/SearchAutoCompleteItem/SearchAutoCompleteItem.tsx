import { Flex } from "@mantine/core"
import { SelectItemProps, Text } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { forwardRef } from "react"
import { documentation } from "~/models/cms/sdk"

type ItemProps = Pick<documentation, "translations" | "id" | "status" | "slug"> &
  SelectItemProps

const SearchAutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, translations, slug, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Link prefetch="intent" to={slug ? slug : "/"}>
        <Flex align="flex-start" direction="column" justify="start" wrap="wrap">
          <Text mb={3} mt={0} size={18} weight="bold">
            {translations ? translations[0]?.title : ""}
          </Text>
          <Text m="0" size={13.5}>
            {translations ? translations[0]?.summary : ""}
          </Text>
        </Flex>
      </Link>
    </div>
  ),
)

SearchAutoCompleteItem.displayName = "AutoCompleteSearchItem"

export default SearchAutoCompleteItem
