import { Box } from "@mantine/core"
import React from "react"
import { CodeBlock, dracula } from "react-code-blocks"
import classes from "./CodeSnippet.module.css"
type CodeSnippetProps = {
  code: string
  language: string
}

const CodeSnippet = ({ code, language }: CodeSnippetProps) => {
  return (
    <Box className={classes.codeSnippetContainer}>
      <CodeBlock
        showLineNumbers
        language={language}
        text={code}
        theme={{
          ...dracula,
          backgroundColor: "rgba(39, 41, 47, 0.5)",
          functionColor: "rgb(255, 146, 43)",
          stringColor: "rgb(56, 217, 169)",
        }}
      />
    </Box>
  )
}

export default CodeSnippet
