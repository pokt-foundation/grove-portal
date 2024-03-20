import { Box, Group } from "@mantine/core"
import React, { useCallback } from "react"
import CodeEditor, { AutocompleteOption } from "~/components/CodeEditor"
import CopyTextButton from "~/components/CopyTextButton"

type JsonEditorProps =
  | {
      value: string
      readOnly?: true
      onChange?: never
      autocompleteOptions?: AutocompleteOption[]
    }
  | {
      value: string
      readOnly?: false
      onChange: (payload: string) => void
      autocompleteOptions?: AutocompleteOption[]
    }

const JsonEditor = ({
  value,
  readOnly,
  onChange,
  autocompleteOptions,
}: JsonEditorProps) => {
  const handleJsonChange = (value: string) => {
    try {
      if (value) {
        JSON.parse(value)
        if (onChange) {
          onChange(value)
        }
      }
    } catch (error) {}
  }

  const formatJson = useCallback(
    (json: string) => {
      try {
        const parsedJson = JSON.parse(json)
        if (onChange) {
          onChange(JSON.stringify(parsedJson, null, " "))
        }
      } catch (e) {}
    },
    [onChange],
  )

  return (
    <Box
      pos="relative"
      onBlur={() => {
        if (value) {
          formatJson(value)
        }
      }}
    >
      <Group gap={0} pos="absolute" style={{ zIndex: 100, top: 8, right: 8 }}>
        <CopyTextButton size={16} value={value} variant="transparent" width={28} />
      </Group>
      <CodeEditor
        autocompleteOptions={autocompleteOptions}
        lang="json"
        readOnly={readOnly}
        value={value}
        onCodeChange={handleJsonChange}
      />
    </Box>
  )
}

export default JsonEditor
