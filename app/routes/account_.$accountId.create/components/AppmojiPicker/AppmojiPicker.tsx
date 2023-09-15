import { useClickOutside } from "@mantine/hooks"
import { ActionIcon, Box, createStyles } from "@pokt-foundation/pocket-blocks"
import EmojiPicker, { Emoji } from "emoji-picker-react"
import { Theme } from "emoji-picker-react/src/types/exposedTypes"
import { useState } from "react"

export const DEFAULT_APPMOJI = "1f9e9"

const useStyles = createStyles((theme) => ({
  appmojiActionIcon: {
    borderColor: theme.colors.dark[4],
  },
  appmojiPickerContainer: {
    position: "absolute",
    top: "40px",
    left: "-150px",
  },
}))

type AppmojiPickerProps = {
  defaultValue?: string
  onAppmojiSelect: (appmoji: string) => void
}

const AppmojiPicker = ({ defaultValue, onAppmojiSelect }: AppmojiPickerProps) => {
  const { classes } = useStyles()
  const [showAppmojiPicker, setShowAppmojiPicker] = useState(false)
  const [selectedAppmoji, setSelectedAppmoji] = useState(defaultValue ?? DEFAULT_APPMOJI)
  const appmojiContainerRef = useClickOutside(() => setShowAppmojiPicker(false))

  return (
    <Box pos="relative">
      <ActionIcon
        className={classes.appmojiActionIcon}
        size="lg"
        variant="outline"
        onClick={() => setShowAppmojiPicker(true)}
      >
        <Emoji size={14} unified={selectedAppmoji} />
      </ActionIcon>
      {showAppmojiPicker && (
        <div ref={appmojiContainerRef} className={classes.appmojiPickerContainer}>
          <EmojiPicker
            theme={Theme.DARK}
            onEmojiClick={({ unified }) => {
              setSelectedAppmoji(unified)
              onAppmojiSelect(unified)
              setShowAppmojiPicker(false)
            }}
          />
        </div>
      )}
    </Box>
  )
}

export default AppmojiPicker
