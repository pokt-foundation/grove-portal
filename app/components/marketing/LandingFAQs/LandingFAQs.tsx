import Container from "~/components/shared/Container"
import Section, { links as SectionLinks } from "~/components/shared/Section"
import Title, { links as TitleLinks } from "~/components/shared/Title"
import Text, { links as TextLinks } from "~/components/shared/Text"
import { useTranslate } from "~/context/TranslateContext"
import styles from "./styles.css"
import Grid from "~/components/shared/Grid"
import { Accordion } from "@mantine/core"
import Group from "~/components/shared/Group"
import Button from "~/components/shared/Button"
import { Link } from "@remix-run/react"

export const links = () => {
  return [
    ...SectionLinks(),
    ...TitleLinks(),
    ...TextLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

interface AccordionLabelProps {
  index: number
  question: string
}

function AccordionLabel({ index, question }: AccordionLabelProps) {
  const number = `0${index + 1}`
  return (
    <Group noWrap>
      <Text className="pokt-accordion-item-number">{number}</Text>
      <Text className="pokt-accordion-item-question">{question}</Text>
    </Group>
  )
}

export default function LandingFAQs() {
  const { t } = useTranslate()

  const faqs = t.faq.faqs //.slice(0, 5)

  return (
    <Section className="pokt-landing-faqs" px={128}>
      <Container size="sm">
        <div className="pokt-landing-header">
          <Title order={2} align="center">
            Frequently Asked Questions about{" "}
            <Text component="span" weight={900} color="blue">
              Pocket Portal
            </Text>
          </Title>
        </div>
      </Container>
      <Container size="xl">
        <Accordion
          className="pokt-landing-faqs-accordion"
          initialItem={0}
          iconPosition="right"
        >
          {faqs.map((item, index) => (
            <Accordion.Item
              className="pokt-landing-faqs-accordion-item"
              label={<AccordionLabel {...item} index={index} />}
              key={item.question}
            >
              <Text size="sm">{item.answer}</Text>
            </Accordion.Item>
          ))}
        </Accordion>
        {/* <Button component={Link} to="/faqs">
          Get all your questions answered
        </Button> */}
      </Container>
    </Section>
  )
}
