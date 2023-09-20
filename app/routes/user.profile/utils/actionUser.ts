import { json } from "@remix-run/node"
import { getSdk, UpdateUser, User } from "~/models/portal/sdk"
import { getErrorMessage } from "~/utils/catchError"
import { LoaderDataStruct } from "~/utils/loader"

export type ActionUser = { user: User }

export const actionUser = async (
  portal: ReturnType<typeof getSdk>,
  input: UpdateUser,
) => {
  try {
    const updatePortalUserResponse = await portal.updatePortalUser({
      updateUser: input,
    })
    if (!updatePortalUserResponse.updatePortalUser) {
      throw new Error("User not able to be updated")
    }

    return json<LoaderDataStruct<ActionUser>>({
      data: {
        user: updatePortalUserResponse.updatePortalUser as User,
      },
      error: false,
    })
  } catch (error) {
    return json<LoaderDataStruct<ActionUser>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}
