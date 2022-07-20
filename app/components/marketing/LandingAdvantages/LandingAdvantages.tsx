import Container from "~/components/shared/Container"
import Section, { links as SectionLinks } from "~/components/shared/Section"
import Title, { links as TitleLinks } from "~/components/shared/Title"
import Text, { links as TextLinks } from "~/components/shared/Text"
import { useTranslate } from "~/context/TranslateContext"
import styles from "./styles.css"
import Grid from "~/components/shared/Grid"
import { Skeleton } from "@mantine/core"
import Card, { links as CardLinks } from "~/components/shared/Card"

export const links = () => {
  return [
    ...SectionLinks(),
    ...TitleLinks(),
    ...TextLinks(),
    ...CardLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export default function LandingAdvantages() {
  const { t } = useTranslate()

  const advantagesList = [
    {
      icon: "test",
      title: "Nodes",
      description:
        "Support your favorite applications and networks while earning from them.",
    },
    {
      icon: "test",
      title: "Community",
      description: "Contribute to the movement towards unstoppable infrastructure.",
    },
    {
      icon: "test",
      title: "Dapps",
      description: "Pocket provides RPC access to the long tail of blockchain networks.",
    },
  ]

  return (
    <Section className="pokt-landing-advantages" px={128}>
      <Container size="sm">
        <div className="pokt-landing-header">
          <Title order={2} align="center">
            Advantages of the{" "}
            <Text component="span" weight={900} color="blue">
              Pocket Portal
            </Text>
          </Title>
          <Text size="sm" align="center">
            This application allows you to create an endpoint while deploying it on a
            decentralized infrastructure, making it less vulnerable to outages!
          </Text>
        </div>
      </Container>
      <Container size="xl">
        <div className="pokt-landing-advantages-video">
          <div style={{ paddingTop: "56.25%", backgroundColor: "#222" }} />
        </div>
        <Grid className="pokt-landing-advantages-cards">
          {advantagesList.map((advantage) => (
            <Grid.Col key={advantage.title} span={12} sm={4}>
              <Card>
                <div className="pokt-card-header">
                  <h3>{advantage.title}</h3>
                </div>
                <div>
                  <Text component="p" size="sm">
                    {advantage.description}
                  </Text>
                </div>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
