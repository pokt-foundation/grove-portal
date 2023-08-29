import { ActionIcon, createStyles, Menu } from "@pokt-foundation/pocket-blocks"
import EmojiPicker, { Emoji } from "emoji-picker-react"
import { Theme } from "emoji-picker-react/src/types/exposedTypes"
import { useState } from "react"

export const DEFAULT_APPMOJI = "1f9e9"

const useStyles = createStyles((theme) => ({
  appmojiMenuDropdown: {
    minWidth: "350px",
    maxWidth: "350px",
    maxHeight: "600px",
    overflow: "auto",
    padding: 0,
  },
}))

type AppmojiPickerProps = { onAppmojiSelect: (appmoji: string) => void }

const AppmojiPicker = ({ onAppmojiSelect }: AppmojiPickerProps) => {
  const { classes } = useStyles()
  const [showAppmojiPicker, setShowAppmojiPicker] = useState(false)
  const [showAppmojiPickerMenu, setShowAppmojiPickerMenu] = useState(false)
  const [selectedAppmoji, setSelectedAppmoji] = useState(DEFAULT_APPMOJI)

  const handleShowAppmojiPicker = () => {
    // Because of an issue with rendering the emoji picker, the menu should be rendered first and then the picker
    setShowAppmojiPickerMenu(!showAppmojiPickerMenu)
    setTimeout(() => setShowAppmojiPicker(!showAppmojiPicker), 0)
  }

  return (
    <Menu
      withArrow
      classNames={{ dropdown: classes.appmojiMenuDropdown }}
      openDelay={500}
      opened={showAppmojiPickerMenu}
      position="top"
      shadow="md"
      width={400}
      onChange={handleShowAppmojiPicker}
    >
      <Menu.Target>
        <ActionIcon size="lg" variant="outline">
          <Emoji size={14} unified={selectedAppmoji} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {showAppmojiPicker && (
          <EmojiPicker
            theme={Theme.DARK}
            onEmojiClick={({ unified }) => {
              setSelectedAppmoji(unified)
              onAppmojiSelect(unified)
              setShowAppmojiPickerMenu(false)
              setShowAppmojiPicker(false)
            }}
          />
        )}
      </Menu.Dropdown>
    </Menu>
  )
}

export default AppmojiPicker
