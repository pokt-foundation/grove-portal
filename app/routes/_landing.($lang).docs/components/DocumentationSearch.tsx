import {
  Autocomplete,
  AutocompleteItem,
  IconSearch,
  Loader,
} from "@pokt-foundation/pocket-blocks"
import { useFetcher, useNavigate } from "@remix-run/react"
import { useEffect, useMemo, useState } from "react"
import AutoCompleteSearchItem from "~/components/SearchAutoCompleteItem"
import useDebounce from "~/hooks/useDebounce"
import { documentation } from "~/models/cms/sdk"

export const DocumentationSearch = () => {
  const navigate = useNavigate()
  const fetcher = useFetcher()

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchResults, setSearchResults] = useState<documentation[]>([])

  const debouncedSearchTerm = useDebounce<string>(searchTerm)

  useEffect(() => {
    if (
      debouncedSearchTerm &&
      fetcher.state === "idle" &&
      searchResults.length === 0 &&
      searchTerm === debouncedSearchTerm
    ) {
      fetcher.submit(
        { searchTerm: debouncedSearchTerm },
        {
          action: "/api/search-docs",
          method: "post",
        },
      )
    }
  }, [debouncedSearchTerm, fetcher, searchResults.length, searchTerm])

  useEffect(() => {
    setSearchResults(fetcher.data ? fetcher.data.data : [])
  }, [fetcher.data])

  const searchResultsData = useMemo(() => {
    return searchResults.length > 0
      ? searchResults.map((doc, i) => ({
          ...doc,
          value:
            doc && doc.translations && doc.translations[0]?.title
              ? doc?.translations[0]?.title
              : doc.id,
        }))
      : []
  }, [searchResults])

  return (
    <Autocomplete
      aria-label="Documentation search"
      data={fetcher.state === "submitting" ? [] : searchResultsData}
      dropdownComponent="div"
      filter={(value, item) => Boolean(item.value)}
      icon={<IconSearch />}
      itemComponent={AutoCompleteSearchItem}
      limit={20}
      nothingFound={
        debouncedSearchTerm &&
        fetcher.state !== "submitting" &&
        searchResultsData.length === 0 &&
        debouncedSearchTerm === searchTerm
          ? "No results"
          : ""
      }
      placeholder="Search"
      rightSection={fetcher.state === "submitting" ? <Loader size="sm" /> : null}
      size="md"
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
      }}
    />
  )
}

export default DocumentationSearch
