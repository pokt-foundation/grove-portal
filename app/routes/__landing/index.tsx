import { LinksFunction } from "@remix-run/node"
import { useTranslate } from "~/context/TranslateContext"
import styles from "~/styles/landing.css"
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
import LandingConnect, {
  links as LandingConnectLinks,
} from "~/components/marketing/LandingConnect"
import LandingFooter, {
  links as LandingFooterLinks,
} from "~/components/marketing/LandingFooter"
import Grid from "~/components/shared/Grid"
import Container from "~/components/shared/Container"
import Section, { links as SectionLinks } from "~/components/shared/Section"
import LandingSocial, {
  links as LandingSocialLinks,
} from "~/components/marketing/LandingSocial"

export const links: LinksFunction = () => {
  return [
    ...SectionLinks(),
    ...LandingHeroLinks(),
    ...LandingDiscoverLinks(),
    ...LandingBlockchainsLinks(),
    ...LandingAdvantagesLinks(),
    ...LandingFAQsLinks(),
    ...LandingTestimonialsLinks(),
    ...LandingConnectLinks(),
    ...LandingFooterLinks(),
    ...LandingSocialLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export default function Index() {
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
      <Section px={128}>
        <Container size="xl">
          <Grid>
            <Grid.Col span={12}>
              <LandingConnect />
            </Grid.Col>
            <Grid.Col sm={12} md={4}>
              <LandingSocial />
            </Grid.Col>
            <Grid.Col sm={12} md={6} offsetMd={2}>
              <LandingFooter />
            </Grid.Col>
          </Grid>
        </Container>
      </Section>
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
