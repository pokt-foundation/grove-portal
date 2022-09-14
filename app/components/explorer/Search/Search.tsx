import { MantineSize } from "@mantine/core"
import { Button } from "@pokt-foundation/pocket-blocks"
import { Form, useSearchParams } from "@remix-run/react"
import { useEffect, useRef } from "react"
import styles from "./styles.css"
import Card, { links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"

interface SearchProps {
  size?: MantineSize
}

export const links = () => {
  return [...CardLinks(), ...TextInputLinks(), { rel: "stylesheet", href: styles }]
}

export const Search = ({ size }: SearchProps) => {
  const [searchParams] = useSearchParams()
  const query = searchParams.getAll("query")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query && inputRef.current) {
      inputRef.current.value = ""
    }
  }, [query])

  return (
    <div className="pokt-explorer-search">
      <Card>
        <div className="pokt-card-header">
          <h3>Search By</h3>
        </div>
        <Form action="/explorer/search">
          <TextInput
            ref={inputRef}
            aria-label="Search POKT Explorer"
            name="query"
            placeholder="Transaction Hash, Block #"
            rightSection={
              <Button compact type="submit" variant="outline">
                Search
              </Button>
            }
            rightSectionWidth={85}
            size={size}
          />
        </Form>
      </Card>
    </div>
  )
}

export default Search
