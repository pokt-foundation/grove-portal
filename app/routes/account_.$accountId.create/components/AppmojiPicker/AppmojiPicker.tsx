import { ActionIcon, Box } from "@mantine/core"
import { useClickOutside } from "@mantine/hooks"
import EmojiPicker, { Emoji, Theme } from "emoji-picker-react"
import { useState } from "react"

export const DEFAULT_APPMOJI = "1f333"

type AppmojiPickerProps = {
  defaultValue?: string
  onAppmojiSelect: (appmoji: string) => void
}

const AppmojiPicker = ({ defaultValue, onAppmojiSelect }: AppmojiPickerProps) => {
  const [showAppmojiPicker, setShowAppmojiPicker] = useState(false)
  const [selectedAppmoji, setSelectedAppmoji] = useState(defaultValue ?? DEFAULT_APPMOJI)
  const appmojiContainerRef = useClickOutside(() => setShowAppmojiPicker(false))

  return (
    <Box pos="relative">
      <ActionIcon
        aria-label="Open appmoji picker"
        size="lg"
        variant="outline"
        onClick={() => setShowAppmojiPicker(true)}
      >
        <Emoji size={14} unified={selectedAppmoji} />
      </ActionIcon>
      {showAppmojiPicker && (
        <Box
          ref={appmojiContainerRef}
          pos="absolute"
          style={{
            zIndex: "var(--mantine-z-index-popover)",
          }}
          top={40}
        >
          <EmojiPicker
            theme={Theme.DARK}
            onEmojiClick={({ unified }) => {
              setSelectedAppmoji(unified)
              onAppmojiSelect(unified)
              setShowAppmojiPicker(false)
            }}
          />
        </Box>
      )}
    </Box>
  )
}

export default AppmojiPicker
