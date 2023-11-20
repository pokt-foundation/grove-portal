import { ActionIcon, Tooltip, CopyButton } from "@mantine/core"
import { LuCopy, LuCopyCheck } from "react-icons/lu/index.js"
import useCommonStyles from "~/styles/commonStyles"

type CopyTextButtonProps = { value: string }

const CopyTextButton = ({ value }: CopyTextButtonProps) => {
  const { classes: commonClasses } = useCommonStyles()
  return (
    <CopyButton timeout={2000} value={value}>
      {({ copied, copy }) => (
        <Tooltip withArrow label={copied ? "Copied" : "Copy"}>
          <ActionIcon
            className={commonClasses.grayOutlinedButton}
            color={copied ? "teal" : "gray"}
            radius="xl"
            size={40}
            variant="outline"
            onClick={copy}
          >
            {copied ? <LuCopyCheck size={18} /> : <LuCopy size={18} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  )
}

export default CopyTextButton
