import { Title, Text } from "@mantine/core"

type ErrorViewProps = {
  message?: string
}

export const ErrorView = ({ message }: ErrorViewProps) => {
  return (
    <div>
      <Title order={1}>Error</Title>
      {message && <Text>{message}</Text>}
    </div>
  )
}

export default ErrorView
