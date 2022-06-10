import { ActionFunction, json } from "@remix-run/node"
import { emitWarning } from "process"
import { postFeedback } from "~/models/portal.server"

export interface FeedbackActionResponse {
  error: boolean
  data: {
    feedback: string
    location: string
    pageTitle: string
  }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  let data: FeedbackActionResponse["data"] = {
    feedback: "",
    location: "",
    pageTitle: "",
  }

  if (formData.has("feedback_message") && formData.get("feedback_message") !== "") {
    data.feedback = formData.get("feedback_message") as string
  } else {
    return { error: true, status: 422, message: "Feedback is required." }
  }
  if (formData.has("feedback_location")) {
    data.location = formData.get("feedback_location") as string
  }
  if (formData.has("feedback_pageTitle")) {
    data.pageTitle = formData.get("feedback_pageTitle") as string
  }

  const res = await postFeedback(data, request)

  console.log(res)

  return json<FeedbackActionResponse>({
    error: res.error,
    data: data,
  })
}
