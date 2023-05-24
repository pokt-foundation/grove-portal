import {
  Autocomplete,
  AutocompleteItem,
  IconSearch,
  MediaQuery,
} from "@pokt-foundation/pocket-blocks"
import { useFetcher, useNavigate } from "@remix-run/react"
import { useState } from "react"
import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"
import AutoCompleteSearchItem from "~/components/SearchAutoCompleteItem"
import { useDocumentationSearch } from "~/routes/_landing.($lang).docs/hooks"

interface DocumentationSearchProps {
  docsLinks: LinksGroupProps[]
}

export const DocumentationSearch = ({ docsLinks }: DocumentationSearchProps) => {
  const navigate = useNavigate()
  const fetcher = useFetcher()
  const [mobileExpanded, setMobileExpanded] = useState(false)

  const {
    searchResultsData,
    searchTerm,
    setSearchTerm,
    setSearchResults,
    autocompleteRightSection,
    nothingFoundText,
  } = useDocumentationSearch({ fetcher, docsLinks })

  return (
    <>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Autocomplete
          aria-label="Documentation search"
          data={fetcher.state === "submitting" ? [] : searchResultsData}
          dropdownComponent="div"
          filter={(_, item) => Boolean(item.value)}
          icon={<IconSearch />}
          itemComponent={AutoCompleteSearchItem}
          limit={20}
          nothingFound={nothingFoundText}
          placeholder="Search in Docs"
          rightSection={autocompleteRightSection}
          rightSectionWidth={25}
          size="md"
          styles={{
            rightSection: {
              paddingRight: 5,
            },
          }}
          sx={(theme) => ({
            width: "280px",
            ".mantine-Autocomplete-itemsWrapper": {
              maxHeight: "500px",
            },
            ".mantine-Autocomplete-wrapper": {
              display: "flex",
              justifyContent: "flex-end",
            },
            ".mantine-Autocomplete-input": {
              width: mobileExpanded ? "280px" : "32px",
              backgroundColor: "transparent",
              borderColor: theme.colors.gray[4],
              transition: "all 0.5s ease-in-out",

              "&::placeholder": {
                color: theme.colors.gray[4],
              },
            },
            ".mantine-Autocomplete-icon": {
              color: theme.colors.gray[3],
            },
            ".mantine-Autocomplete-dropdown": {
              backgroundColor: theme.colors.navy[6],
            },
          })}
          value={searchTerm}
          onChange={(term) => {
            setSearchResults([])
            setSearchTerm(term)
          }}
          onClick={() => setMobileExpanded(true)}
          onDropdownClose={() => setMobileExpanded(false)}
          onItemSubmit={(item: AutocompleteItem) => {
            navigate(item.link)
            setSearchTerm("")
          }}
        />
      </MediaQuery>

      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Autocomplete
          aria-label="Documentation search"
          data={fetcher.state === "submitting" ? [] : searchResultsData}
          dropdownComponent="div"
          filter={(_, item) => Boolean(item.value)}
          icon={<IconSearch />}
          itemComponent={AutoCompleteSearchItem}
          limit={20}
          nothingFound={nothingFoundText}
          placeholder="Search in Docs"
          rightSection={autocompleteRightSection}
          rightSectionWidth={25}
          size="md"
          styles={{
            rightSection: {
              paddingRight: 5,
            },
          }}
          sx={(theme) => ({
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
              backgroundColor: "transparent",
              borderColor: theme.colors.gray[4],

              "&::placeholder": {
                color: theme.colors.gray[4],
              },
            },
            ".mantine-Autocomplete-icon": {
              color: theme.colors.gray[3],
            },
            ".mantine-Autocomplete-dropdown": {
              backgroundColor: theme.colors.navy[6],
            },
          })}
          value={searchTerm}
          onChange={(term) => {
            setSearchResults([])
            setSearchTerm(term)
          }}
          onItemSubmit={(item: AutocompleteItem) => {
            navigate(item.link)
            setSearchTerm("")
          }}
        />
      </MediaQuery>
    </>
  )
}

export default DocumentationSearch
