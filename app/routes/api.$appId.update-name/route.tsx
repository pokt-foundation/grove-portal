import { ActionFunction, json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { getErrorMessage } from "~/utils/catchError"
import { requireUser } from "~/utils/session.server"

export type ContactSalesActionData = {
  result: "success" | "error"
  message: string
}

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const formData = await request.formData()
  const name = formData.get("name")
  const endpointId = formData.get("endpoint-id")

  try {
    invariant(typeof name === "string", "Field name must be set")
    invariant(typeof endpointId === "string", "Field endpoint-id must be set")

    const response = await portal.updateEndpoint({
      input: {
        id: endpointId,
        name: name,
      },
    })

    if (!response.updateEndpoint.id) {
      throw new Error("Error saving name to portal db")
    }
    return json({
      result: "success",
      message: `Application ID ${endpointId} was updated successfully`,
    })
  } catch (error) {
    return json({
      result: "error",
      message: getErrorMessage(error),
    })
  }
}
