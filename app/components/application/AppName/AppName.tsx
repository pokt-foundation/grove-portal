import {
  Box,
  Button,
  IconEdit,
  IconSave,
  Text,
  TextInput,
} from "@pokt-foundation/pocket-blocks"
import { Form, useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface AppNameProps {
  id: string
  name: string
}

export default function AppKeysCard({ id, name }: AppNameProps) {
  const [editing, setEditing] = useState(false)
  const [nameState, setNameState] = useState(name)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const fetcher = useFetcher()

  const handleButtonClick = () => {
    if (editing) {
      // todo: save to db
      fetcher.submit(
        {
          name: nameState,
          "endpoint-id": id,
        },
        {
          action: "/api/updateName",
          method: "post",
        },
      )
      setEditing(false)
    } else {
      setEditing(true)
    }
  }

  useEffect(() => {
    if (fetcher.data && fetcher.data.result === "error") {
      setNameState(name)
      setError(true)
      setErrorMessage(fetcher.data.message)
    }
  }, [fetcher.data])

  useEffect(() => {
    setTimeout(() => {
      setError(false)
    }, 2000)
  }, [error])

  return (
    <Box
      className="pokt-app-name"
      sx={{
        marginBottom: "32px",
        "&:hover button": {
          opacity: "100%",
          pointerEvents: "auto",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "32px",
        }}
      >
        <h1 hidden={editing} style={{ margin: 0 }}>
          {nameState}
        </h1>
        {editing && (
          <TextInput
            defaultValue={nameState}
            size="lg"
            sx={{ flexGrow: 1 }}
            onChange={(e) => setNameState(e.currentTarget.value)}
          />
        )}
        <Button
          size="xs"
          sx={{
            opacity: editing ? "100%" : "0",
            pointerEvents: editing ? "auto" : "none",
            transition: "opacity ease-in-out 0.3s",
          }}
          variant="outline"
          onClick={handleButtonClick}
        >
          {editing ? (
            <IconSave height={18} width={18} />
          ) : (
            <IconEdit height={18} width={18} />
          )}
        </Button>
      </Box>
      {error && (
        <Text c="red" fz="xs">
          {errorMessage}
        </Text>
      )}
    </Box>
  )
}
