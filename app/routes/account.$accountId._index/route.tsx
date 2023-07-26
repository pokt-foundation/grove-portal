import { Center } from "@mantine/core"
import { LoaderFunction, MetaFunction } from "@remix-run/node"
import React from "react"

export const meta: MetaFunction = () => {
  return {
    title: "Account Overview",
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  return null
}

export default function Account() {
  return <Center>🦦 🦦 ACCOUNT OVERVIEW GOES HERE 🦦 🦦</Center>
}
