import { Container as MantineContainer, ContainerProps } from "@mantine/core"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <MantineContainer className="container" {...props}>
      {children}
    </MantineContainer>
  )
}

export default Container
