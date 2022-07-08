import styles from "./styles.css"
import clsx from "clsx"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  backgroundImage?: string
  px?: number
  py?: number
}

export default function Section({
  children,
  className,
  backgroundImage,
  px = 0,
  py = 0,
  ...props
}: SectionProps) {
  const backgroundStyles = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {}
  const paddingStyles = { padding: `${px}px ${py}px` }
  const styles = {
    ...backgroundStyles,
    ...paddingStyles,
  }

  return (
    <section
      className={clsx({
        "pokt-section": true,
        className,
      })}
      style={styles}
      {...props}
    >
      {children}
    </section>
  )
}
