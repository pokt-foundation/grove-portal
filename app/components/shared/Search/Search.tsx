import { MantineSize } from "@mantine/core"
import { Button } from "~/components/shared/Button"
import { TextInput } from "~/components/shared/TextInput"
import { Form, useSearchParams } from "@remix-run/react"
import { useEffect, useRef } from "react"
import styles from "./styles.css"

interface SearchProps {
  size?: MantineSize
}

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
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
    <Form action="/search">
      <TextInput
        name="query"
        ref={inputRef}
        aria-label="Search POKT Explorer"
        placeholder="Search by Transaction Hash, Block #"
        size={size}
        rightSection={
          <Button type="submit" compact color="gray" variant="outline">
            Search
          </Button>
        }
        rightSectionWidth={85}
      />
    </Form>
  )
}

export default Search
