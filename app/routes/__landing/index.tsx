import { Container } from "~/components/shared/Container"
import { Form, Link } from "@remix-run/react"
import { Group } from "~/components/shared/Group"
import Text from "~/components/shared/Text"
import { LinksFunction } from "@remix-run/node"
import { CallOutBox, links as CallOutBoxLinks } from "../../components/shared/CallOutBox"
import { useTranslate } from "~/context/TranslateContext"
import styles from "~/styles/landing.css"
import { Accordion, Skeleton, Title } from "@mantine/core"
import Button from "~/components/shared/Button"
import Grid from "~/components/shared/Grid"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Section, { links as SectionLinks } from "~/components/shared/Section"
import LandingHero, {
  links as LandingHeroLinks,
} from "~/components/marketing/LandingHero"
import LandingDiscover, {
  links as LandingDiscoverLinks,
} from "~/components/marketing/LandingDiscover"
import LandingBlockchains, {
  links as LandingBlockchainsLinks,
} from "~/components/marketing/LandingBlockchains"
import LandingAdvantages, {
  links as LandingAdvantagesLinks,
} from "~/components/marketing/LandingAdvantages"
import LandingFAQs, {
  links as LandingFAQsLinks,
} from "~/components/marketing/LandingFAQs"
import LandingTestimonials, {
  links as LandingTestimonialsLinks,
} from "~/components/marketing/LandingTestimonials"

export const links: LinksFunction = () => {
  return [
    ...CallOutBoxLinks(),
    ...CardLinks(),
    ...SectionLinks(),
    ...LandingHeroLinks(),
    ...LandingDiscoverLinks(),
    ...LandingBlockchainsLinks(),
    ...LandingAdvantagesLinks(),
    ...LandingFAQsLinks(),
    ...LandingTestimonialsLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export default function Index() {
  const { t } = useTranslate()

  return (
    <>
      <LandingHero />
      <LandingDiscover />
      <LandingBlockchains />
      <hr />
      <LandingAdvantages />
      <hr />
      <LandingFAQs />
      <LandingTestimonials />
    </>
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <dialog title="Index Error" color="red">
        {error.message}
      </dialog>
    </div>
  )
}
