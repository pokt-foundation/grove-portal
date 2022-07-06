import styles from "./styles.css"
import clsx from "clsx"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  backgroundImage?: string
  p?: number
}

export default function Section({
  children,
  className,
  backgroundImage,
  p = 0,
  ...props
}: SectionProps) {
  const backgroundStyles = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {}
  const paddingStyles = p ? { padding: `${p}px 0` } : {}
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
