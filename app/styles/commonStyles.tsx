import { createStyles } from "@mantine/core"

const useCommonStyles = createStyles((theme) => ({
  mainBackgroundColor: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
  },
  grayOutline: {
    borderColor:
      theme.colorScheme === "dark" ? theme.colors.gray[8] : theme.colors.dark[8],
  },
}))

export default useCommonStyles
