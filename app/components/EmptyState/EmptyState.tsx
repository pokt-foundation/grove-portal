import { Image, Text, Stack } from "@pokt-foundation/pocket-blocks"
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
        withPlaceholder
        alt={alt ? alt : "Empty state placeholder"}
        height={imgHeight}
        src={imgSrc}
        width={imgWidth}
      />
      <Text fw={600} fz="xl">
        {title}
      </Text>
      <Text fw={400} fz="sm" ta="center">
        {subtitle}
      </Text>
      {callToAction ? callToAction : null}
    </Stack>
  )
}

export default EmptyState
