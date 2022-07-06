import {
  Title as MantineTitle,
  TitleProps as MantineTitleProps,
  Text as MantineText,
  TextProps,
  ButtonProps,
} from "@mantine/core"
import Button from "~/components/shared/Button"

interface TitleProps {
  pre: MantineTitleProps
  title: MantineTitleProps
  description: TextProps<"div">
  button: ButtonProps<"button">
}

export default function Title({ pre, title, description, button }: TitleProps) {
  return (
    <div className="pokt-title">
      {pre && <MantineTitle {...pre} />}
      {title && <MantineTitle {...title} />}
      {description && <MantineText {...description} />}
      {button && <Button {...button} />}
    </div>
  )
}
