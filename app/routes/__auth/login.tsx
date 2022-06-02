import { Form } from "@remix-run/react"

export default function Login() {
  return (
    <Form action="/api/auth/auth0" method="post">
      <button>Login with Auth0</button>
    </Form>
  )
}
