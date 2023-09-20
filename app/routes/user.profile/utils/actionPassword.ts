import { json } from "@remix-run/node"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { LoaderDataStruct } from "~/utils/loader"

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

    return json<LoaderDataStruct<ActionPassword>>({
      data: {
        auth0: res.status,
      },
      error: false,
    })
  } catch (error) {
    return json<LoaderDataStruct<ActionPassword>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}
