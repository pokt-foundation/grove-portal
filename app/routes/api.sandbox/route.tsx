import { ActionFunction, json } from "@remix-run/node"
import invariant from "tiny-invariant"

export type SandboxRequestData = {
  error: boolean
  data?: any
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const payload = formData.get("payload")
  const chainUrl = formData.get("chainUrl")
  const secretKey = formData.get("secretKey")

  invariant(typeof payload === "string", "payload must be set")
  invariant(typeof chainUrl === "string", "chainUrl must be set")

  try {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    if (secretKey) {
      invariant(typeof secretKey === "string", "secretKey must be set")
      headers.append("Authorization", secretKey)
    }

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: payload,
    }

    const data = await fetch(chainUrl, requestOptions).then((response) => response.json())

    return json<SandboxRequestData>({
      error: false,
      data,
    })
  } catch (error) {
    return json<SandboxRequestData>({
      error: true,
    })
  }
}
