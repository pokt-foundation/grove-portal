import { Alert, Center } from "@mantine/core"
import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

type LoaderData = {
  param?: string
}

export const loader: LoaderFunction = ({ params }) => {
  return {
    param: params["*"],
  }
}

export default function Route404() {
  const data = useLoaderData() as LoaderData
  return (
    <Center className="error-container" mt="xl">
      <Alert title="Page Not Found" color="red">
        {data.param ?? "No Param"}
      </Alert>
    </Center>
  )
}
