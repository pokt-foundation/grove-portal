import { useFetcher } from "@remix-run/react"

export default function Login() {
  const fetcher = useFetcher()
  return <button onClick={() => fetcher.load("/api/auth/auth0")}>Login with Auth0</button>
}
