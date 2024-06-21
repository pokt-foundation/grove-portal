import { createTheme, MantineTheme, MantineThemeOverride } from "@mantine/core"

export const portalTheme: MantineThemeOverride = createTheme({
  primaryColor: "green",
  primaryShade: { light: 4, dark: 7 },
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#302F2F",
      "#2C2E33",
      "#242424",
      "#27292F",
      "#282828",
      "#191919",
    ],
    gray: [
      "#FAFAFA",
      "#f1f3f5",
      "#EBECED",
      "#DDDDDD",
      "#ced4da",
      "#adb5bd",
      "#808B95",
      "#495057",
      "#343438",
      "#202024",
    ],
    blue: [
      "#F0F6FC",
      "#d0ebff",
      "#a5d8ff",
      "#74c0fc",
      "#33B0FF",
      "#339af0",
      "#228be6",
      "#1D8AED",
      "#1971c2",
      "#005099",
    ],
    green: [
      "#ebfbee",
      "#d3f9d8",
      "#b2f2bb",
      "#8ce99a",
      "#65C971",
      "#46BD6B",
      "#40c057",
      "#389F58",
      "#154623",
      "#11381C",
    ],
    yellow: [
      "#fff9db",
      "#fff3bf",
      "#ffec99",
      "#ffe066",
      "#ffd43b",
      "#fcc419",
      "#fab005",
      "#E1A43E",
      "#f08c00",
      "#e67700",
    ],
    orange: [
      "#fff4e6",
      "#ffe8cc",
      "#ffd8a8",
      "#ffc078",
      "#ffa94d",
      "#ff922b",
      "#fd7e14",
      "#f76707",
      "#FF8170",
      "#D65745",
    ],
    navy: [
      "#E3E3E3",
      "#A4A7AC",
      "#e9ecef",
      "#dee2e6",
      "#26282B",
      "#161D25",
      "#10161C",
      "#0B0E12",
      "#05070A",
      "#000000",
    ],
    magenta: [
      "#E5C0EA",
      "#CE88D6",
      "#C46FCD",
      "#B044BB",
      "#A733B2",
      "#9E26A9",
      "#961DA1",
      "#871990",
      "#771581",
      "#681170",
    ],
    teal: [
      "#e6fcf5",
      "#c3fae8",
      "#96f2d7",
      "#63e6be",
      "#38d9a9",
      "#20c997",
      "#12b886",
      "#6BAA9F",
      "#099268",
      "#087f5b",
    ],
  },
  components: {
    Menu: {
      defaultProps: {
        position: "bottom-end",
      },
      styles: () => ({
        dropdown: {
          maxHeight: "400px",
          minWidth: "165px",
          overflow: "auto",
          backgroundColor: "var(--mantine-color-body)",
        },
      }),
    },
    Text: {
      defaultProps: {
        fz: "sm",
      },
      styles: {
        root: {
          margin: 0,
        },
      },
    },
    Button: {
      defaultProps: {
        size: "md",
        radius: "xl",
        fw: "400",
        fz: "sm",
      },
    },
    Badge: {
      defaultProps: {
        color: "gray",
        fw: 400,
        fz: "xs",
      },
      styles: () => ({
        root: { backgroundColor: "var(--app-secondary-bg-color)" },
      }),
    },
    Divider: {
      defaultProps: { opacity: "50%" },
    },
    TextInput: {
      defaultProps: {
        radius: "sm",
      },
      styles: {
        input: {
          backgroundColor: "transparent",
        },
      },
    },
    Input: {
      styles: {
        input: {
          backgroundColor: "transparent",
        },
      },
    },
    CloseButton: {
      defaultProps: {
        size: "md",
      },
    },
    Card: {
      styles: () => ({
        root: {
          backgroundColor: "var(--mantine-color-body)",
        },
      }),
    },
    Notification: {
      defaultProps: {
        py: 12,
        px: 15,
        radius: 8,
      },
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: "var(--mantine-color-body)",
          border: "1px solid",
        },
      }),
    },
    Drawer: {
      defaultProps: {
        overlayProps: { opacity: 0.8, color: "var(--mantine-color-navy-9)" },
      },
    },
  },
})
