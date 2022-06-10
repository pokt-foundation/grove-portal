import { useState } from "react"
import { Form, useFetcher } from "@remix-run/react"
import { IconUp, IconDown } from "@pokt-foundation/ui"
//import { useSpring, animated } from "react-spring"

import styles from "./styles.css"
import { FeedbackActionResponse } from "~/routes/api/feedbackform"

const ShareFeedback = "/assets/share-feedback.svg"
const heart = "/assets/heart.svg"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface FeedbackBoxProps {}

export default function FeedbackBox({ className }: { className?: string }) {
  const fetcher = useFetcher<FeedbackActionResponse>()
  // const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false)
  // const [error, setError] = useState(false)
  //const userEmail = useUser().email?.toString() || "Unknown user email"

  return (
    <div className="feedback box">
      {fetcher.state === "submitting" ? (
        <div className="top">
          <div className="row">
            <div className="spaceholder">
              <img className="image" src={heart} alt="heart image" aria-hidden="true" />
            </div>
            <div>
              <h3 className="title">Thanks</h3>{" "}
              <p className="bodytext">For your feedback!</p>
            </div>
          </div>
          <button
            className="openclosebutton"
            onClick={() => {
              setOpen(!open)
            }}
          >
            x
          </button>
        </div>
      ) : (
        <>
          <div className="top">
            <div className="row">
              <div className="spaceholder">
                <img
                  className="image"
                  src={ShareFeedback}
                  alt="share feedback"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="title">Share Feedback</h3>
                <p className="bodytext">Help us to improve Pocket Portal</p>
              </div>
            </div>
            <button
              className="openclosebutton"
              aria-label={
                open ? "Click to close feedback box" : "Click to open feedback box"
              }
              title={open ? "Click to close feedback box" : "Click to open feedback box"}
              onClick={() => {
                setOpen(!open)
              }}
            >
              {open ? <IconUp /> : <IconDown />}
            </button>
          </div>

          {open && (
            <div className={`animatedBox ${open}`}>
              <fetcher.Form method="post" action="/api/feedbackform">
                <textarea
                  className="textarea"
                  name="feedback_message"
                  style={{
                    border: fetcher.data?.error
                      ? "1px solid #F93232"
                      : "1px solid #fafafa",
                  }}
                  aria-invalid={fetcher.data?.error ?? false}
                  aria-errormessage="error"
                  placeholder="Would be interesting to..."
                />
                <input
                  hidden
                  name="feedback_location"
                  value={window?.location?.href || "Unknown Portal Page"}
                />
                <input
                  hidden
                  name="feedback_pageTitle"
                  value={document?.title || "Unknown page Title"}
                />
                <p
                  className="bodytext"
                  id="error"
                  style={{
                    color: "#f93232",
                    paddingTop: "8px",
                    display: `${fetcher.data?.error ? "block" : "none"}`,
                  }}
                >
                  Text area must be filled out to submit a suggestion.
                </p>
                <p
                  className="bodytext"
                  style={{
                    marginBottom: "16px",
                    paddingTop: "8px",
                  }}
                >
                  Do not share any personal info
                </p>
                <button
                  className="submit"
                  type="submit"
                  aria-label="Submit feedback"
                  title="Submit feedback"
                >
                  Submit
                </button>
              </fetcher.Form>
            </div>
          )}
        </>
      )}
    </div>
  )
}
