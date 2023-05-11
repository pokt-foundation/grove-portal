import {
  Group,
  Box,
  Collapse,
  Text,
  UnstyledButton,
  IconCaretRight,
  useMantineTheme,
  MantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { useLocation } from "@remix-run/react"
import { useState } from "react"

type GetTextColor = (isActive: boolean, theme: MantineTheme, size?: string) => string

const getTextColor: GetTextColor = (isActive, theme, size = "") => {
  if (isActive) {
    return theme.colors.blue[5]
  }
  return size === "lg" ? "#fff" : theme.colors.navy[0]
}

type GetFontSize = (nesting_level: number, size?: string) => string

const getFontSize: GetFontSize = (nesting_level, size) => {
  if (size && size === "lg") {
    return "18px"
  }
  if (nesting_level) {
    return "15px"
  }
  return "16px"
}

type LinkItemProps = {
  isActive: boolean
  label: string
  link: string
  nesting_level?: number
  size?: string
  theme: MantineTheme
}

const LinkItem = ({
  isActive,
  label,
  link,
  nesting_level = 0,
  size,
  theme,
}: LinkItemProps) => (
  <Text
    m={0}
    p={nesting_level ? `10.5px 0 10.5px ${nesting_level * 32}px` : "16px 8px"}
    sx={{
      backgroundColor: isActive ? theme.colors.navy[4] : "transparent",
      color: getTextColor(isActive, theme, size),
      fontSize: getFontSize(nesting_level, size),
      fontWeight: size === "lg" ? "bold" : "normal",
      textTransform: "capitalize",

      "&:hover": {
        backgroundColor: theme.colors.navy[4],
      },
    }}
  >
    <a href={link}>{label}</a>
  </Text>
)

export interface LinksGroupProps {
  id: string
  initiallyOpened?: boolean
  label: string
  link: string
  links: LinksGroupProps[]
  nesting_level?: number
  size?: string
  slug: string
}

const LinksGroup = ({
  initiallyOpened,
  label,
  link,
  links,
  nesting_level,
  size,
  slug,
}: LinksGroupProps) => {
  const [opened, setOpened] = useState(initiallyOpened || false)

  const location = useLocation()
  const isActive = location.pathname.includes(slug)

  const theme = useMantineTheme()

  const hasLinks = links && links.length > 0

  const items = (hasLinks ? links : []).map((linkItem) => (
    <LinksGroup
      id={linkItem.id}
      key={linkItem.label}
      initiallyOpened={linkItem.initiallyOpened}
      label={linkItem.label}
      link={linkItem.link}
      links={linkItem.links}
      nesting_level={linkItem.nesting_level}
      size={size}
      slug={linkItem.slug}
    />
  ))

  return (
    <>
      <UnstyledButton w="100%" onClick={() => setOpened((opened) => !opened)}>
        <Group
          position="apart"
          spacing={0}
          sx={{
            backgroundColor: isActive ? theme.colors.navy[4] : "transparent",
            "&:hover": {
              backgroundColor: theme.colors.navy[4],
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LinkItem
              isActive={isActive}
              label={label}
              link={link}
              nesting_level={nesting_level}
              size={size}
              theme={theme}
            />
          </Box>
          {hasLinks && (
            <IconCaretRight
              aria-label="caret-right"
              height="18px"
              style={{
                transform: opened ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease-in-out",
              }}
              width="18px"
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}

export default LinksGroup
