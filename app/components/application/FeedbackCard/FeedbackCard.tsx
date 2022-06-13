import { useState, useEffect } from "react"
import { useFetcher } from "@remix-run/react"
import { IconUp, IconDown } from "@pokt-foundation/ui"
import styles from "./styles.css"
import { FeedbackActionResponse } from "~/routes/api/feedbackform"
import { useTranslate } from "~/context/TranslateContext"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function FeedbackBox({ className }: { className?: string }) {
  const fetcher = useFetcher<FeedbackActionResponse>()
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [location, setLocation] = useState("Unknown Portal Page")
  const [pageTitle, setPageTitle] = useState("Unknown page Title")
  const {
    t: { common, feedback },
  } = useTranslate()

  useEffect(() => {
    setLocation(window?.location?.href)
    setPageTitle(document?.title)
  }, [])

  useEffect(() => {
    if (fetcher.state === "submitting") {
      setSubmitted(true)
    }
  }, [fetcher.state])

  return (
    <div className="feedback box">
      {submitted && fetcher.type === "done" && !fetcher.data.error ? (
        <div className="top">
          <div className="row">
            <div className="spaceholder">
              <img
                className="image"
                src="/heart.svg"
                alt={feedback.heartImageAlt}
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 className="title">{feedback.thanksTitle}</h3>{" "}
              <p className="bodytext">{feedback.thanksSubtext}</p>
            </div>
          </div>
          <button
            className="openclosebutton"
            onClick={() => {
              setOpen(false)
              setSubmitted(false)
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
                  alt={feedback.feedbackShareAltText}
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="title">{feedback.feedbackTitle}</h3>
                <p className="bodytext">{feedback.feedbackSubText}</p>
              </div>
            </div>
            <button
              className="openclosebutton"
              aria-label={open ? feedback.clickClose : feedback.clickOpen}
              title={open ? feedback.clickClose : feedback.clickOpen}
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
                placeholder={feedback.textAreaPlaceholder}
              />
              <input hidden name="feedback_location" defaultValue={location} />
              <input hidden name="feedback_pageTitle" defaultValue={pageTitle} />
              <p
                className="bodytext error"
                id="error"
                style={{
                  display: fetcher.data?.error ? "block" : "none",
                }}
              >
                {feedback.errorText}
              </p>
              <p
                className="bodytext"
                style={{
                  marginBottom: "16px",
                  paddingTop: "8px",
                }}
              >
                {feedback.personal}
              </p>
              <button
                className="submit"
                type="submit"
                aria-label="Submit feedback"
                title="Submit feedback"
              >
                {common.submit}
              </button>
            </fetcher.Form>
          </div>
        </>
      )}
    </div>
  )
}
