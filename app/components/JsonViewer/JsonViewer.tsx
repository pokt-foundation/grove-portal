import { ActionIcon, Box, Group, JsonInput, Tooltip } from "@mantine/core"
import React, { useState } from "react"
import { LuPencil, LuSave } from "react-icons/lu"
import CodeSnippet from "~/components/CodeSnippet"
import CopyTextButton from "~/components/CopyTextButton"
import { KeyValuePair } from "~/types/global"

type JsonViewerProps =
  | {
      value: KeyValuePair<any>
      editable?: false
      onEditSave?: never
    }
  | {
      value: KeyValuePair<any>
      editable?: true
      onEditSave: (payload: KeyValuePair<any>) => void
    }

const JsonViewer = ({ value, editable, onEditSave }: JsonViewerProps) => {
  const [tempValue, setTempValue] = useState("")
  const [jsonError, setJsonError] = useState("")
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleSaveClick = () => {
    if (onEditSave) {
      try {
        const parsed = JSON.parse(tempValue)
        onEditSave(parsed)
        setIsEditing(false)
      } catch (error) {
        setJsonError((error as Error).message)
      }
    }
  }

  const editJson = () => {
    setTempValue(JSON.stringify(value, null, " "))
    setIsEditing(true)
  }

  return (
    <Box pos="relative">
      <Group gap={0} pos="absolute" style={{ zIndex: 100, top: 8, right: 8 }}>
        {editable ? (
          <Box>
            <Tooltip withArrow label={isEditing ? "Save" : "Edit"}>
              <ActionIcon
                aria-label={isEditing ? "Save JSON" : "Edit JSON"}
                color="gray"
                variant="transparent"
                onClick={() => (isEditing ? handleSaveClick() : editJson())}
              >
                {isEditing ? <LuSave size={16} /> : <LuPencil size={16} />}
              </ActionIcon>
            </Tooltip>
          </Box>
        ) : null}
        {!isEditing ? (
          <CopyTextButton
            size={16}
            value={JSON.stringify(value)}
            variant="transparent"
            width={28}
          />
        ) : null}
      </Group>

      {isEditing ? (
        <JsonInput
          autosize
          formatOnBlur
          validationError={jsonError}
          value={tempValue}
          onChange={setTempValue}
        ></JsonInput>
      ) : (
        <CodeSnippet code={JSON.stringify(value, null, " ")} language="json" />
      )}
    </Box>
  )
}

export default JsonViewer
