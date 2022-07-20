import Container from "~/components/shared/Container"
import Section, { links as SectionLinks } from "~/components/shared/Section"
import Title, { links as TitleLinks } from "~/components/shared/Title"
import Text, { links as TextLinks } from "~/components/shared/Text"
import Button from "~/components/shared/Button"
import { Link } from "@remix-run/react"
import { useTranslate } from "~/context/TranslateContext"
import styles from "./styles.css"
import Group from "~/components/shared/Group"
import Swiper, { links as SwiperLinks } from "~/components/shared/Swiper"
import { Autoplay } from "swiper"

export const links = () => {
  return [
    ...SectionLinks(),
    ...TitleLinks(),
    ...TextLinks(),
    ...SwiperLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export default function LandingBlockchains() {
  const { t } = useTranslate()

  return (
    <Section px={128}>
      <Container size="xl">
        <div className="pokt-landing-header">
          <Group position="apart">
            <Title order={3}>
              Supported{" "}
              <Text component="span" weight={900}>
                Blockchains
              </Text>
            </Title>
            <Button component={Link} to="#">
              Find the chain you are looking for
            </Button>
          </Group>
        </div>
      </Container>
      <Swiper
        className="pokt-landing-logos"
        spaceBetween={16}
        slidesPerView={3}
        loop={true}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 6,
          },
          1220: {
            slidesPerView: 7,
          },
        }}
        modules={[Autoplay]}
      >
        {t.landing.chains.map((name) => {
          return (
            <div key={name} className="logo-wrapper">
              <img
                alt={`${name} logo`}
                className="logo"
                src={`/landing-logos/${name}_logo.png`}
              />
            </div>
          )
        })}
      </Swiper>
    </Section>
  )
}
