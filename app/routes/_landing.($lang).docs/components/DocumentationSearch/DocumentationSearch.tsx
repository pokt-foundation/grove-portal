import {
  Autocomplete,
  AutocompleteItem,
  IconSearch,
} from "@pokt-foundation/pocket-blocks"
import { useFetcher, useNavigate } from "@remix-run/react"
import AutoCompleteSearchItem from "~/components/SearchAutoCompleteItem"
import { useDocumentationSearch } from "~/routes/_landing.($lang).docs/hooks"

export const DocumentationSearch = () => {
  const navigate = useNavigate()
  const fetcher = useFetcher()

  const {
    searchResultsData,
    searchTerm,
    setSearchTerm,
    setSearchResults,
    autocompleteRightSection,
    nothingFoundText,
  } = useDocumentationSearch({ fetcher })

  return (
    <Autocomplete
      aria-label="Documentation search"
      data={fetcher.state === "submitting" ? [] : searchResultsData}
      dropdownComponent="div"
      filter={(value, item) => Boolean(item.value)}
      icon={<IconSearch />}
      itemComponent={AutoCompleteSearchItem}
      limit={20}
      nothingFound={nothingFoundText}
      placeholder="Search"
      rightSection={autocompleteRightSection}
      rightSectionWidth={25}
      size="md"
      styles={{
        rightSection: {
          paddingRight: 5,
        },
      }}
      sx={() => ({
        width: "560px",
        ".mantine-Autocomplete-itemsWrapper": {
          maxHeight: "500px",
        },
        ".mantine-Autocomplete-wrapper": {
          display: "flex",
          justifyContent: "flex-end",
        },
        ".mantine-Autocomplete-input": {
          width: "350px",
        },
      })}
      value={searchTerm}
      onChange={(term) => {
        setSearchResults([])
        setSearchTerm(term)
      }}
      onItemSubmit={(item: AutocompleteItem) => {
        navigate(item.slug)
        setSearchTerm("")
      }}
    />
  )
}

export default DocumentationSearch
