import { Image, Text, Stack } from "@mantine/core"
import { type ReactNode } from "react"

type EmptyStateProps = {
  title: string
  subtitle: ReactNode
  imgSrc: string
  imgHeight: number
  imgWidth: number
  alt?: string
  callToAction?: ReactNode
}

export const EmptyState = ({
  title,
  subtitle,
  imgSrc,
  imgHeight,
  imgWidth,
  alt,
  callToAction,
}: EmptyStateProps) => {
  return (
    <Stack align="center" justify="center" mt={120}>
      <Image
        alt={alt ? alt : "Empty state placeholder"}
        h={imgHeight}
        src={imgSrc}
        w={imgWidth}
      />
      <Text fw={600} fz="xl" ta="center">
        {title}
      </Text>
      <Text fw={400} fz="sm" maw={510} ta="center">
        {subtitle}
      </Text>
      {callToAction ? callToAction : null}
    </Stack>
  )
}

export default EmptyState
