import { useState, useEffect } from "react"
import { Form, useFetcher } from "@remix-run/react"
import { IconUp, IconDown } from "@pokt-foundation/ui"
//import { useSpring, animated } from "react-spring"

import styles from "./styles.css"
import { FeedbackActionResponse } from "~/routes/api/feedbackform"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface FeedbackBoxProps {}

export default function FeedbackBox({ className }: { className?: string }) {
  const fetcher = useFetcher<FeedbackActionResponse>()
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState("Unknown Portal Page")
  const [pageTitle, setPageTitle] = useState("Unknown page Title")

  useEffect(() => {
    setLocation(window?.location?.href)
    setPageTitle(document?.title)
  }, [])

  return (
    <div className="feedback box">
      {fetcher.type === "done" && !fetcher.data.error ? (
        <div className="top">
          <div className="row">
            <div className="spaceholder">
              <img
                className="image"
                src="/heart.svg"
                alt="heart image"
                aria-hidden="true"
              />
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
                  src="/share-feedback.svg"
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

          <div className={`animatedBox ${open}`}>
            <fetcher.Form className="form" method="post" action="/api/feedbackform">
              <textarea
                className="textarea"
                name="feedback_message"
                style={{
                  border: fetcher.data?.error
                    ? "1px solid var(--color-error)"
                    : "1px solid var(--color-white-main)",
                }}
                aria-invalid={fetcher.data?.error ?? false}
                aria-errormessage="error"
                placeholder="Would be interesting to..."
              />
              <input hidden name="feedback_location" value={location} />
              <input hidden name="feedback_pageTitle" value={pageTitle} />
              <p
                className="bodytext error"
                id="error"
                style={{
                  display: fetcher.data?.error ? "block" : "none",
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
        </>
      )}
    </div>
  )
}
