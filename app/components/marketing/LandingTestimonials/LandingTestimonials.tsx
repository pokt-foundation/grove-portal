import Container from "~/components/shared/Container"
import Section, { links as SectionLinks } from "~/components/shared/Section"
import Title, { links as TitleLinks } from "~/components/shared/Title"
import Text, { links as TextLinks } from "~/components/shared/Text"
import { useTranslate } from "~/context/TranslateContext"
import styles from "./styles.css"
import Swiper, { links as SwiperLinks } from "~/components/shared/Swiper/Swiper"
import { Autoplay, Navigation } from "swiper"

export const links = () => {
  return [
    ...SectionLinks(),
    ...TitleLinks(),
    ...TextLinks(),
    ...SwiperLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export default function LandingTestimonials() {
  const { t } = useTranslate()

  return (
    <Section className="pokt-landing-testimonials" px={128}>
      <Container size="xl">
        <Title order={2} align="center">
          The best choice for those{" "}
          <Text component="span" weight={900}>
            who want to get ahead!
          </Text>
        </Title>
        <Swiper
          className="pokt-landing-quotes"
          slidesPerView={2}
          centeredSlides={true}
          loop={true}
          speed={3000}
          navigation={true}
          modules={[Autoplay, Navigation]}
        >
          {t.landing.chains.map((name) => {
            return (
              <div
                key={name}
                className="logo-wrapper"
                style={{ backgroundColor: "#222", height: 300 }}
              ></div>
            )
          })}
        </Swiper>
      </Container>
    </Section>
  )
}
