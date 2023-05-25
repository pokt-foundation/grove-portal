import { useDebouncedValue } from "@mantine/hooks"
import {
  type AutocompleteItem,
  Loader,
  ActionIcon,
  IconX,
} from "@pokt-foundation/pocket-blocks"
import { FetcherWithComponents } from "@remix-run/react"
import { type ReactNode, useEffect, useMemo, useState } from "react"
import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"
import { type documentation } from "~/models/cms/sdk"

type FetcherData = {
  data: documentation[]
}

type UseDocumentationSearchProps = {
  fetcher: FetcherWithComponents<FetcherData>
  docsLinks: LinksGroupProps[]
}

export type UseDocumentationSearchReturnType = {
  searchTerm: string
  setSearchResults: (
    value: ((prevState: documentation[]) => documentation[]) | documentation[],
  ) => void
  setSearchTerm: (value: ((prevState: string) => string) | string) => void
  searchResultsData: AutocompleteItem[]
  autocompleteRightSection: ReactNode
  nothingFoundText: string
}

export const useDocumentationSearch = ({
  fetcher,
  docsLinks,
}: UseDocumentationSearchProps): UseDocumentationSearchReturnType => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchResults, setSearchResults] = useState<documentation[]>([])
  const [debouncedSearchTerm] = useDebouncedValue<string>(searchTerm, 500)

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
      ? searchResults
          .filter((doc) => doc?.translations && doc.translations.length > 0)
          .map((doc) => ({
            ...doc,
            link: docsLinks.find(({ id }) => id === doc.id)?.link,
            value:
              doc && doc.translations && doc.translations[0]?.title
                ? doc?.translations[0]?.title
                : doc.id,
          }))
      : []
  }, [docsLinks, searchResults])

  const autocompleteRightSection = useMemo(() => {
    if (!searchTerm) {
      return null
    }

    return fetcher.state === "submitting" ? (
      <Loader size="sm" />
    ) : (
      <ActionIcon aria-label="Dismiss search button" variant="transparent">
        <IconX height={19} width={19} onClick={() => setSearchTerm("")} />
      </ActionIcon>
    )
  }, [fetcher.state, searchTerm])

  const nothingFoundText = useMemo(
    () =>
      debouncedSearchTerm &&
      fetcher.state !== "submitting" &&
      searchResultsData.length === 0 &&
      debouncedSearchTerm === searchTerm
        ? `No results found for “${searchTerm}”. Please Try again with a different keyword.`
        : "",
    [debouncedSearchTerm, fetcher.state, searchResultsData.length, searchTerm],
  )

  return {
    searchResultsData,
    searchTerm,
    setSearchTerm,
    setSearchResults,
    autocompleteRightSection,
    nothingFoundText,
  }
}
