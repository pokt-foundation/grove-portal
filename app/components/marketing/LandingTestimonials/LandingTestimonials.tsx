import Container from "~/components/shared/Container"
import Section, { links as SectionLinks } from "~/components/shared/Section"
import Title, { links as TitleLinks } from "~/components/shared/Title"
import Text, { links as TextLinks } from "~/components/shared/Text"
import { useTranslate } from "~/context/TranslateContext"
import styles from "./styles.css"
import Swiper, { links as SwiperLinks } from "~/components/shared/Swiper/Swiper"
import { Autoplay, Navigation } from "swiper"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Group from "~/components/shared/Group"
import Grid from "~/components/shared/Grid"
import { Stack } from "@mantine/core"

export const links = () => {
  return [
    ...SectionLinks(),
    ...TitleLinks(),
    ...TextLinks(),
    ...SwiperLinks(),
    ...CardLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export default function LandingTestimonials() {
  const { t } = useTranslate()

  return (
    <Section className="pokt-landing-testimonials" px={128}>
      <Container size="xl">
        <div className="pokt-landing-header">
          <Title order={2} align="center">
            The best choice for those{" "}
            <Text component="span" weight={900}>
              who want to get ahead!
            </Text>
          </Title>
        </div>
      </Container>
      <Swiper
        className="pokt-landing-quotes"
        slidesPerView={2}
        centeredSlides={true}
        loop={true}
        speed={3000}
        height={300}
        navigation={true}
        modules={[Autoplay, Navigation]}
      >
        {t.testimonials.map((testimonial) => {
          return (
            <Card key={testimonial.speaker.name}>
              <Grid>
                <Grid.Col span={4}>
                  <Stack
                    justify="space-between"
                    align="stretch"
                    sx={{
                      height: "100%",
                    }}
                  >
                    <div>
                      <h6>{testimonial.speaker.company}</h6>
                    </div>
                    <div>
                      <h3>{testimonial.speaker.name}</h3>
                      <h6>{testimonial.speaker.title}</h6>
                    </div>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Card>
                    <p>"{testimonial.quote}"</p>
                  </Card>
                </Grid.Col>
              </Grid>
            </Card>
          )
        })}
      </Swiper>
    </Section>
  )
}
