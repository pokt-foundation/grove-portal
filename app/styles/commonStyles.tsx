import { createStyles } from "@mantine/core"

const useCommonStyles = createStyles((theme) => ({
  mainBackgroundColor: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
  },
}))

export default useCommonStyles
