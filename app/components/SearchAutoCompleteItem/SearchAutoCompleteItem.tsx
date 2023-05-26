import { SelectItemProps, Text, Flex } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { forwardRef } from "react"
import { type LinksGroupProps } from "~/components/LinksGroup/LinksGroup"
import { documentation } from "~/models/cms/sdk"

export type SearchAutoCompleteItemProps = Pick<
  documentation,
  "translations" | "id" | "status" | "slug"
> &
  Pick<LinksGroupProps, "link"> &
  SelectItemProps & { link: string }

const SearchAutoCompleteItem = forwardRef<HTMLDivElement, SearchAutoCompleteItemProps>(
  ({ id, translations, slug, link, ...others }: SearchAutoCompleteItemProps, ref) => (
    <div ref={ref} {...others}>
      <Link prefetch="intent" to={link ? link : "/"}>
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
