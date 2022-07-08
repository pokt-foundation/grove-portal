import styles from "./styles.css"

import { Title as MantineTitle, TitleProps } from "@mantine/core"
import clsx from "clsx"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function Title({ ...props }: TitleProps) {
  return (
    <MantineTitle
      className={clsx(
        {
          "pokt-title": true,
        },
        props.className,
      )}
      {...props}
    />
  )
}
