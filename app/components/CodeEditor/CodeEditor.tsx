import { json as jsonLang, jsonLanguage, jsonParseLinter } from "@codemirror/lang-json"
import { StreamLanguage } from "@codemirror/language"
import { shell } from "@codemirror/legacy-modes/mode/shell"
import { linter, lintGutter } from "@codemirror/lint"
import { Box } from "@mantine/core"
import { xcodeDarkInit } from "@uiw/codemirror-theme-xcode"
import CodeMirror from "@uiw/react-codemirror"
import { ClientOnly } from "remix-utils/client-only"
import CopyTextButton from "~/components/CopyTextButton"

type CodeEditorProps = {
  value: string
  onCodeChange?: (value: string) => void
  lang: "json" | "shell"
  readOnly?: boolean
  noCopy?: boolean
  autocompleteOptions?: AutocompleteOption[]
}

export type AutocompleteOption = {
  label: string
  apply?: string
  info?: string
  displayLabel?: string
}

const jsonAutoComplete = (options: AutocompleteOption[]) =>
  jsonLanguage.data.of({
    autocomplete: function myCompletions(context: {
      matchBefore: (arg0: RegExp) => any
      explicit: any
    }) {
      const word = context.matchBefore(/\w*/)
      if (word?.from === word?.to && !context?.explicit) return null
      return {
        from: word.from,
        options: options,
      }
    },
  })

const myTheme = xcodeDarkInit({
  settings: {
    background: "#302f2f",
    gutterBackground: "#302f2f",
  },
})

const CodeEditor = ({
  value,
  lang,
  noCopy,
  readOnly,
  onCodeChange,
  autocompleteOptions,
}: CodeEditorProps) => {
  const extensions =
    lang === "json"
      ? [
          jsonLang(),
          linter(jsonParseLinter()),
          lintGutter(),
          ...(autocompleteOptions ? [jsonAutoComplete(autocompleteOptions)] : []),
        ]
      : [StreamLanguage.define(shell)]

  return (
    <ClientOnly fallback={<>Loading...</>}>
      {() => (
        <Box pos="relative">
          {noCopy ? null : (
            <Box pos="absolute" style={{ zIndex: 100, top: 8, right: 8 }}>
              <CopyTextButton size={16} value={value} variant="transparent" width={28} />
            </Box>
          )}
          <CodeMirror
            autoFocus={!readOnly}
            basicSetup={{
              ...(readOnly && {
                highlightActiveLine: false,
                highlightActiveLineGutter: false,
              }),
              closeBrackets: true,
            }}
            extensions={extensions}
            minHeight="50px"
            readOnly={readOnly}
            theme={myTheme}
            value={value}
            onChange={(value, viewUpdate) => {
              onCodeChange && onCodeChange(value)
            }}
          />
        </Box>
      )}
    </ClientOnly>
  )
}

export default CodeEditor
