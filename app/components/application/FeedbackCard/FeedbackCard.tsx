import { useState } from "react"
import { Form } from "@remix-run/react"
import { IconUp, IconDown } from "@pokt-foundation/ui"
//import { useSpring, animated } from "react-spring"

import styles from "./styles.css"

const ShareFeedback = "/assets/share-feedback.svg"
const heart = "/assets/heart.svg"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface FeedbackBoxProps {}

export default function FeedbackBox({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false)
  const [textArea, setTextArea] = useState<
    string | number | readonly string[] | undefined
  >("")
  const [error, setError] = useState(false)
  //const userEmail = useUser().email?.toString() || "Unknown user email"

  return (
    <div className="feedback box">
      {submitted ? (
        <div className="top">
          <div className="row">
            <div className="spaceholder">
              <img className="image" src={heart} aria-hidden="true" />
            </div>
            <div>
              <h3 className="title">Thanks</h3>{" "}
              <p className="bodytext">For your feedback!</p>
            </div>
          </div>
          <button
            className="openclosebutton"
            onClick={() => {
              setSubmitted(!submitted)
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
                <img className="image" src={ShareFeedback} aria-hidden="true" />
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
                setError(false)
              }}
            >
              {open ? <IconUp /> : <IconDown />}
            </button>
          </div>

          {open && (
            <div className={`animatedBox ${open}`}>
              <Form method="post" action="">
                <textarea
                  className="textarea"
                  style={{
                    border: error ? "1px solid #F93232" : "1px solid #fafafa",
                  }}
                  aria-invalid={error}
                  aria-errormessage="error"
                  placeholder="Would be interesting to..."
                  value={textArea}
                  onChange={(e) => {
                    setTextArea(e.target.value)
                  }}
                />
                <p
                  className="bodytext"
                  id="error"
                  style={{
                    color: "#f93232",
                    paddingTop: "8px",
                    display: `${error ? "block" : "none"}`,
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
                  type="button"
                  aria-label="Submit feedback"
                  title="Submit feedback"
                >
                  Submit
                </button>
              </Form>
            </div>
          )}
        </>
      )}
    </div>
  )
}
