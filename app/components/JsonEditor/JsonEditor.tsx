import { ActionIcon, JsonInput } from "@mantine/core"
import { Prism } from "@mantine/prism"
import React, { useState } from "react"
import { LuPencil, LuSave } from "react-icons/lu"

type JsonEditorProps = {
  payload: { [key: string]: any }
  onEditSave: (payload: { [key: string]: any }) => void
}

const JsonEditor = ({ payload, onEditSave }: JsonEditorProps) => {
  const [tempPayload, setTempPayload] = useState("")
  const [jsonError, setJsonError] = useState("")
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleSaveClick = () => {
    try {
      const parsed = JSON.parse(tempPayload)
      onEditSave(parsed)
      setIsEditing(false)
    } catch (error) {
      setJsonError((error as Error).message)
    }
  }

  const editJson = () => {
    setTempPayload(JSON.stringify(payload, null, " "))
    setIsEditing(true)
  }

  return (
    <>
      <ActionIcon
        pos="absolute"
        style={{ zIndex: 100, right: isEditing ? 7 : 34, top: 10 }}
        variant="transparent"
        onClick={() => (isEditing ? handleSaveClick() : editJson())}
      >
        {isEditing ? <LuSave size={16} /> : <LuPencil size={16} />}
      </ActionIcon>
      {isEditing ? (
        <JsonInput
          autosize
          formatOnBlur
          validationError={jsonError}
          value={tempPayload}
          onChange={setTempPayload}
        ></JsonInput>
      ) : (
        <Prism withLineNumbers language="json">
          {JSON.stringify(payload, null, " ")}
        </Prism>
      )}
    </>
  )
}

export default JsonEditor
