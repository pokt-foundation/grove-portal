import { IconDown, IconUp } from "@pokt-foundation/ui"
import { useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import styles from "./styles.css"
import { FeedbackActionResponse } from "~/routes/api/feedbackform"
import { useTranslate } from "~/context/TranslateContext"
import Card, { links as CardLinks } from "~/components/shared/Card"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
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
    <Card>
      <div className="feedback box">
        {submitted && fetcher.type === "done" && !fetcher.data.error ? (
          <div className="top">
            <div className="row">
              <div className="spaceholder">
                <img
                  alt={feedback.heartImageAlt}
                  aria-hidden="true"
                  className="image"
                  src="/heart.svg"
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
                    alt={feedback.feedbackShareAltText}
                    aria-hidden="true"
                    className="image"
                    src="/share-feedback.svg"
                  />
                </div>
                <div>
                  <h3 className="title">{feedback.feedbackTitle}</h3>
                  <p className="bodytext">{feedback.feedbackSubText}</p>
                </div>
              </div>
              <button
                aria-label={open ? feedback.clickClose : feedback.clickOpen}
                className="openclosebutton"
                title={open ? feedback.clickClose : feedback.clickOpen}
                onClick={() => {
                  setOpen(!open)
                }}
              >
                {open ? <IconUp /> : <IconDown />}
              </button>
            </div>

            <div className={`animatedBox ${open}`}>
              <fetcher.Form action="/api/feedbackform" className="form" method="post">
                <textarea
                  aria-errormessage="error"
                  aria-invalid={fetcher.data?.error ?? false}
                  className="textarea"
                  name="feedback_message"
                  placeholder={feedback.textAreaPlaceholder}
                  style={{
                    border: fetcher.data?.error
                      ? "1px solid var(--color-error)"
                      : "1px solid var(--color-white-main)",
                  }}
                />
                <input hidden defaultValue={location} name="feedback_location" />
                <input hidden defaultValue={pageTitle} name="feedback_pageTitle" />
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
                  aria-label="Submit feedback"
                  className="submit"
                  title="Submit feedback"
                  type="submit"
                >
                  {common.submit}
                </button>
              </fetcher.Form>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
