import { LoaderFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import React from "react"

export const loader: LoaderFunction = async ({ request }) => {
  return null
}

export default function AccountId() {
  return (
    <>
      <Outlet />
    </>
  )
}
