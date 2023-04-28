import styles from "./styles.css"
import Card, { links as CardLinks } from "~/components/shared/Card"
import IconDiscord from "~/components/shared/Icons/IconDiscord"
import { useTranslate } from "~/context/TranslateContext"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export default function FeedbackBox({ className }: { className?: string }) {
  const {
    t: { feedback },
  } = useTranslate()

  return (
    <Card>
      <div className="feedback box">
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
          <a
            aria-label="Click to share feedback with the Pokt Team in discord"
            className="discord-icon"
            href="https://discord.gg/portal-rpc"
            rel="noreferrer"
            target="_blank"
          >
            <IconDiscord />
          </a>
        </div>
      </div>
    </Card>
  )
}
