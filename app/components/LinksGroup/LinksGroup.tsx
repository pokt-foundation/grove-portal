import {
  Group,
  Box,
  Collapse,
  Text,
  UnstyledButton,
  IconCaretRight,
  useMantineTheme,
  MantineTheme,
  List,
} from "@pokt-foundation/pocket-blocks"
import { Link, useLocation } from "@remix-run/react"
import { useState } from "react"

type GetTextColor = (isActive: boolean, theme: MantineTheme, size?: string) => string

const getTextColor: GetTextColor = (isActive, theme, size = "") => {
  if (isActive) {
    return theme.colors.blue[5]
  }
  return size === "lg" ? "#fff" : theme.colors.navy[0]
}

type GetFontSize = (size?: string) => string

const getFontSize: GetFontSize = (size) => {
  if (size && size === "lg") {
    return "18px"
  }

  if (size && size === "sm") {
    return "15px"
  }

  return "16px"
}

type LinkItemProps = {
  hasLinks: boolean
  isActive: boolean
  label: string
  link: string
  nesting_level: number
  size?: string
  theme: MantineTheme
}

const LinkItem = ({
  hasLinks,
  isActive,
  label,
  link,
  nesting_level,
  size,
  theme,
}: LinkItemProps) => (
  <Text
    color={getTextColor(isActive, theme, size)}
    fs={getFontSize(size)}
    fw={size === "lg" ? "bold" : "normal"}
    m={0}
    sx={{
      flexGrow: 1,
    }}
    tt="capitalize"
  >
    {!hasLinks ? (
      <Link
        prefetch="intent"
        style={{
          display: "block",
          height: "100%",
          padding: nesting_level ? `10.5px 0 10.5px ${nesting_level * 32}px` : "16px 8px",
          width: "100%",
        }}
        to={link}
      >
        {label}
      </Link>
    ) : (
      <Box
        sx={{
          display: "block",
          height: "100%",
          padding: nesting_level ? `10.5px 0 10.5px ${nesting_level * 32}px` : "16px 8px",
          width: "100%",
        }}
      >
        {label}
      </Box>
    )}
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
  nesting_level = 0,
  size,
  slug,
}: LinksGroupProps) => {
  const location = useLocation()
  const [opened, setOpened] = useState(() => {
    if (initiallyOpened) {
      return true
    }

    if (location.pathname.includes(slug)) {
      return true
    }

    return false
  })

  const theme = useMantineTheme()

  const splitPathname = location.pathname.split("/")
  const isActive = splitPathname[splitPathname.length - 1].includes(slug)

  const hasLinks = links && links.length > 0

  const items = (hasLinks ? links : []).map((linkItem) => (
    <LinksGroup
      key={linkItem.id}
      id={linkItem.id}
      initiallyOpened={linkItem.initiallyOpened}
      label={linkItem.label}
      link={linkItem.link}
      links={linkItem.links}
      nesting_level={nesting_level + 1}
      size="sm"
      slug={linkItem.slug}
    />
  ))

  return (
    <>
      <List.Item
        sx={{
          backgroundColor: isActive ? theme.colors.navy[4] : theme.colors.navy[7],
          listStyle: "none",

          "&:hover": {
            backgroundColor: theme.colors.navy[4],
          },
        }}
        w="100%"
      >
        <UnstyledButton w="100%" onClick={() => setOpened((opened) => !opened)}>
          <Group position="apart" spacing={0}>
            <LinkItem
              hasLinks={hasLinks}
              isActive={isActive}
              label={label}
              link={link}
              nesting_level={nesting_level}
              size={hasLinks ? "lg" : size}
              theme={theme}
            />
            {hasLinks && (
              <IconCaretRight
                aria-label="caret-right"
                height="18px"
                style={{
                  marginRight: "8px",
                  transform: opened ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease-in-out",
                }}
                width="18px"
              />
            )}
          </Group>
        </UnstyledButton>
      </List.Item>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}

export default LinksGroup
