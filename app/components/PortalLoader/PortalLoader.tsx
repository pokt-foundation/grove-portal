import { createStyles, Stack, Text } from "@pokt-foundation/pocket-blocks"
import Rive from "@rive-app/react-canvas"

const useStyles = createStyles((theme) => ({
  rive: {
    width: "180px",
    height: "180px",
  },
}))

type PortalLoaderProps = { message?: string }

const PortalLoader = ({ message }: PortalLoaderProps) => {
  const { classes } = useStyles()
  return (
    <Stack align="center" justify="center">
      <Rive className={classes.rive} src="/portal-loader.riv" />
      {message && <Text> {message} </Text>}
    </Stack>
  )
}

export default PortalLoader
