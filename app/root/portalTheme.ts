import { MantineThemeOverride, theme } from "@pokt-foundation/pocket-blocks"

export const portalTheme: MantineThemeOverride = {
  ...theme,
  primaryColor: "dark",
  colors: {
    ...theme.colors,
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#27292F",
      "#1F2327",
      "#1A1B1E",
    ],
  },
  components: {
    ...theme.components,
    Paper: {
      styles: {
        root: {
          overflow: "visible !important",
        },
      },
    },
    Card: {
      styles: (theme) => ({
        root: {
          padding: "32px",
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.navy[5] : theme.colors.gray[1],
        },
      }),
    },
    Tabs: {
      styles: (theme) => ({
        tabsList: {
          borderBottom: "2px solid transparent",
          marginBottom: theme.spacing.md,
        },
        tab: {
          paddingRight: theme.spacing.xs,
          paddingLeft: theme.spacing.xs,
          transition: "border-color ease-in-out 0.3s, color ease-in-out 0.3s",
          "&[data-active]": {
            borderColor: theme.colors[theme.primaryColor][6],
          },
          "&:hover": {
            backgroundColor: "transparent",
            borderColor: "transparent",
            color: theme.colors[theme.primaryColor][8],
          },
          "&[data-active]:hover": {
            borderColor: theme.colors[theme.primaryColor][8],
          },
          "&:not(:last-child)": {
            marginRight: theme.spacing.md,
          },
        },
      }),
    },
    TextInput: {
      styles: {
        input: {
          backgroundColor: "transparent",
        },
      },
    },
    Textarea: {
      styles: {
        input: {
          backgroundColor: "transparent",
        },
      },
    },
    Text: {
      styles: {
        root: {
          margin: 0,
        },
      },
    },
    MultiSelect: {
      styles: {
        input: {
          backgroundColor: "transparent",
        },
      },
    },
  },
}
