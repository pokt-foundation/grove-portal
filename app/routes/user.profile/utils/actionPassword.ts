import { json } from "@remix-run/node"
import { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredServerEnvVar } from "~/utils/environment"

export type ActionPassword = { auth0: number }

export const actionPassword = async (email: string) => {
  try {
    const res = await fetch(
      `https://${getRequiredServerEnvVar("AUTH0_DOMAIN")}/dbconnections/change_password`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          client_id: getRequiredServerEnvVar("AUTH0_CLIENT_ID"),
          email,
          connection: getRequiredServerEnvVar("AUTH0_CONNECTION"),
        }),
      },
    )

    return json<DataStruct<ActionPassword>>({
      data: {
        auth0: res.status,
      },
      error: false,
      message: "We've just sent you an email to reset your password.",
    })
  } catch (error) {
    return json<DataStruct<ActionPassword>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}
