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
  isActive: boolean
  hasParent?: boolean
  label: string
  link: string
  size?: string
  theme: MantineTheme
}

const LinkItem = ({ isActive, hasParent, label, link, size, theme }: LinkItemProps) => (
  <Text
    m={0}
    p={hasParent ? "10.5px 0 10.5px 32px" : "16px 8px"}
    sx={{
      color: getTextColor(isActive, theme, size),
      fontSize: getFontSize(size),
      fontWeight: size === "lg" ? "bold" : "normal",
      textTransform: "capitalize",
    }}
  >
    <Link prefetch="intent" to={link}>
      {label}
    </Link>
  </Text>
)

export interface LinksGroupProps {
  id: string
  hasParent?: boolean
  initiallyOpened?: boolean
  label: string
  link: string
  links: LinksGroupProps[]
  size?: string
  slug: string
}

const LinksGroup = ({
  initiallyOpened,
  hasParent,
  label,
  link,
  links,
  size,
  slug,
}: LinksGroupProps) => {
  const [opened, setOpened] = useState(initiallyOpened || false)

  const location = useLocation()
  const isActive = location.pathname.includes(slug)

  const theme = useMantineTheme()

  const hasLinks = links && links.length > 0

  const items = (hasLinks ? links : []).map((linkItem) => (
    <Box key={linkItem.label} w="100%">
      <LinksGroup
        key={linkItem.label}
        hasParent
        id={linkItem.id}
        initiallyOpened={linkItem.initiallyOpened}
        label={linkItem.label}
        link={linkItem.link}
        links={linkItem.links}
        size="sm"
        slug={linkItem.slug}
      />
    </Box>
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
              hasParent={hasParent}
              isActive={isActive}
              label={label}
              link={link}
              size={size}
              theme={theme}
            />
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
      </List.Item>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}

export default LinksGroup
