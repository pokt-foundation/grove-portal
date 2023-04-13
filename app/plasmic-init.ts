import { initPlasmicLoader } from "@plasmicapp/loader-react"
import {
  Anchor,
  Badge,
  Button,
  Card,
  CardSection,
  Image,
  Text,
  TextInput,
  Title,
} from "@pokt-foundation/pocket-blocks"

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "7b3EUxmZQ79TPsQHhyAAmG",
      token:
        "AdMzWpsjyE9FzoBSMbfv6soueXiLTnMX7fhJdaZ5NyAuacLTqry1wgi6NeX2blKZV03CPRqNWiGTTkSlQ",
    },
  ],
  preview: true,
})

PLASMIC.registerComponent(Button, {
  name: "Button",
  props: {
    children: "string",
    color: "string",
    compact: "boolean",
    disabled: "boolean",
    fullWidth: "boolean",
    leftIcon: "slot",
    loaderPosition: {
      type: "choice",
      options: ["left", "right", "center"],
    },
    loading: "boolean",
    radius: {
      type: "choice",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    rightIcon: "slot",
    size: {
      type: "choice",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    type: {
      type: "choice",
      options: ["button", "reset", "submit"],
    },
    uppercase: "boolean",
    variant: {
      type: "choice",
      options: ["outline", "white", "light", "default", "filled", "gradient", "subtle"],
    },
  },
})

PLASMIC.registerComponent(TextInput, {
  name: "TextInput",
  props: {
    description: "string",
    disabled: "boolean",
    error: "slot",
    icon: "slot",
    iconWidth: "number",
    label: "string",
    radius: {
      type: "choice",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    required: "boolean",
    rightSection: "slot",
    rightSectionWidth: "number",
    withAsterisk: "boolean",
    size: {
      type: "choice",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
})

PLASMIC.registerComponent(Card, {
  name: "Card",
  props: {
    children: "slot",
    padding: {
      type: "choice",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    radius: {
      type: "choice",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    withBorder: "boolean",
    shadow: "string",
  },
})

PLASMIC.registerComponent(CardSection, {
  name: "CardSection",
  props: {
    withBorder: "boolean",
    inheritPadding: "boolean",
  },
})

PLASMIC.registerComponent(Title, {
  name: "Title",
  props: {
    align: {
      type: "choice",
      options: [
        "left",
        "right",
        "-moz-initial",
        "inherit",
        "initial",
        "revert",
        "unset",
        "center",
        "end",
        "start",
        "justify",
        "match-parent",
      ],
    },
    children: "string",
    color: "string",
    inherit: "boolean",
    inline: "boolean",
    italic: "boolean",
    lineClamp: "number",
    order: {
      type: "choice",
      options: ["1", "2", "3", "4", "5", "6"],
    },
    size: "number",
    strikethrough: "boolean",
    transform: {
      type: "choice",
      options: [
        "-moz-initial",
        "inherit",
        "initial",
        "revert",
        "unset",
        "none",
        "capitalize",
        "full-size-kana",
        "full-width",
        "lowercase",
        "uppercase",
      ],
    },
    truncate: "boolean",
    underline: "boolean",
    weight: "number",
  },
})

PLASMIC.registerComponent(Text, {
  name: "Text",
  props: {
    align: {
      type: "choice",
      options: [
        "left",
        "right",
        "-moz-initial",
        "inherit",
        "initial",
        "revert",
        "unset",
        "center",
        "end",
        "start",
        "justify",
        "match-parent",
      ],
    },
    children: "string",
    color: "string",
    inherit: "boolean",
    inline: "boolean",
    italic: "boolean",
    lineClamp: "number",
    size: "number",
    span: "boolean",
    strikethrough: "boolean",
    transform: {
      type: "choice",
      options: [
        "-moz-initial",
        "inherit",
        "initial",
        "revert",
        "unset",
        "none",
        "capitalize",
        "full-size-kana",
        "full-width",
        "lowercase",
        "uppercase",
      ],
    },
    truncate: "boolean",
    underline: "boolean",
    weight: "number",
  },
})

PLASMIC.registerComponent(Badge, {
  name: "Badge",
  props: {
    children: "string",
    color: "string",
    fullWidth: "boolean",
    leftSection: "slot",
    radius: {
      type: "choice",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    rightSection: "slot",
    size: {
      type: "choice",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      type: "choice",
      options: ["outline", "light", "filled", "gradient", "dot"],
    },
  },
})

PLASMIC.registerComponent(Image, {
  name: "Image",
  props: {
    alt: "string",
    caption: "string",
    fit: {
      type: "choice",
      options: [
        "contain",
        "fill",
        "-moz-initial",
        "inherit",
        "initial",
        "revert",
        "unset",
        "none",
        "cover",
        "scale-down",
      ],
    },
    height: "number",
    placeholder: "slot",
    radius: {
      type: "choice",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    src: "string",
    width: "number",
    withPlaceholder: "boolean",
  },
})

PLASMIC.registerComponent(Anchor, {
  name: "Anchor",
  props: {
    align: {
      type: "choice",
      options: [
        "left",
        "right",
        "-moz-initial",
        "inherit",
        "initial",
        "revert",
        "unset",
        "center",
        "end",
        "start",
        "justify",
        "match-parent",
      ],
    },
    children: "string",
    color: "string",
    inherit: "boolean",
    inline: "boolean",
    italic: "boolean",
    lineClamp: "number",
    size: {
      type: "choice",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    span: "boolean",
    strikethrough: "boolean",
    transform: {
      type: "choice",
      options: [
        "-moz-initial",
        "inherit",
        "initial",
        "revert",
        "unset",
        "none",
        "capitalize",
        "full-size-kana",
        "full-width",
        "lowercase",
        "uppercase",
      ],
    },
    truncate: "boolean",
    underline: "boolean",
    weight: "number",
  },
})
