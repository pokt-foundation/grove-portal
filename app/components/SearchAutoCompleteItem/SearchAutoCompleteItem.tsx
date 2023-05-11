import { Box, SelectItemProps, Text } from "@pokt-foundation/pocket-blocks"
import { forwardRef } from "react"
import { documentation } from "~/models/cms/sdk"

type ItemProps = Pick<documentation, "translations" | "id" | "status" | "slug"> &
  SelectItemProps

const SearchAutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, translations, ...others }: ItemProps, ref) => {
    return (
      <div ref={ref} {...others}>
        <Box
          // TODO: Use Flex component from blocks
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            justifyItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <Text color="#FAFAFA" mb={3} mt={0} size={18} weight="bold">
            {translations ? translations[0]?.title : ""}
          </Text>
          <Text color="#FAFAFA" m="0" size={13.5}>
            {translations ? translations[0]?.summary : ""}
          </Text>
        </Box>
      </div>
    )
  },
)

SearchAutoCompleteItem.displayName = "AutoCompleteSearchItem"

export default SearchAutoCompleteItem
