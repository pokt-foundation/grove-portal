import {
  Box,
  Button,
  IconEdit,
  IconSave,
  Text,
  TextInput,
} from "@pokt-foundation/pocket-blocks"
import { useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"

interface AppNameProps {
  id: string
  name: string
}

export default function AppName({ id, name }: AppNameProps) {
  const [editing, setEditing] = useState(false)
  const [nameState, setNameState] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const fetcher = useFetcher()

  const handleButtonClick = () => {
    if (editing) {
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
    setNameState(name)
  }, [name])

  useEffect(() => {
    if (fetcher.data && fetcher.data.result === "error") {
      setNameState(name)
      setError(true)
      setErrorMessage(fetcher.data.message)
    }
  }, [fetcher.data, name])

  useEffect(() => {
    if (error === true) {
      setTimeout(() => {
        setError(false)
      }, 2000)
    }
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
          gap: "16px",
        }}
      >
        <h1 hidden={editing} style={{ margin: 0 }}>
          {nameState}
        </h1>
        {editing && (
          <TextInput
            defaultValue={nameState}
            size="lg"
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
