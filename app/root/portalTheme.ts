import { MantineThemeOverride, theme } from "@pokt-foundation/pocket-blocks"

export const portalTheme: MantineThemeOverride = {
  ...theme,
  primaryColor: "blue",
  // primaryShade: 4,
  // colors: {
  //   ...theme.colors,
  //   blue: [
  //     "#e8f3fd",
  //     "#D4F0FF",
  //     "#ADDCF6",
  //     "#77b9f4",
  //     "#33B0FF",
  //     "#1D8AED",
  //     "#176ebe",
  //     "#11538e",
  //     "#0c375f",
  //     "#061c2f",
  //   ],
  // },
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
    MultiSelect: {
      styles: {
        input: {
          backgroundColor: "transparent",
        },
      },
    },
  },
}
