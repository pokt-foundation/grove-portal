import { Box, Title, Text } from "@mantine/core"
import ReactHtmlParser from "react-html-parser"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import Grid from "~/components/shared/Grid"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useTranslate } from "~/context/TranslateContext"
import { ProcessedEndpoint } from "~/models/portal/sdk"

/* c8 ignore next */
export const links = () => {
  return [...CardLinks(), ...TextInputLinks(), { rel: "stylesheet", href: styles }]
}

interface AppPlansOverviewProps {
  planType: string
}

export default function AppPlansOverview({ planType }: AppPlansOverviewProps) {
  const {
    t: { appAddressCard },
  } = useTranslate()

  const planDetailsTitles = {
    pricing: "Pricing",
    relayLimit: "Relay Limit",
    chainAccess: "Chain Access",
    appsLimit: "Apps Limit",
  }

  const planDetails = {
    paid: {
      title: "Pay As You Go",
      description:
        "250k free relays per day, per app. Beyond that, pay only for what you use. The counter resets every 24h but you’ll only get billed monthly. Even better, after 24 months of paid relays, you’ll receive POKT to stake for continued service. No more payments.",
      description2: "No more sunk costs. Just fast, reliable infrastructure.",
      pricing: "Pay per relay + 250K Free Relays",
      relayLimit: "No limit",
      appsLimit: "Up to 2 Applicaitions",
      moreApps: "Need more apps? Contact us",
      chainAccess: "No limit",
    },
    free: {
      title: "Always Free",
      description:
        "Access to reliable, censor resistant infrastructure. Free up to 250k relays per day.",
      description2: "",
      pricing: "$0.00",
      relayLimit: "250k per app per day",
      appsLimit: "Up to 2 Applicaitions",
      moreApps: "Need more apps? Contact us",
      chainAccess: "No limit",
    },
    enterprise: {
      title: "Enterprise",
      description:
        "Relays, applications, and pricing, all custom tailored to fit your specific needs.",
      description2: "No more sunk costs. Just fast, reliable infrastructure.",
      pricing: "based on your needs",
      relayLimit: "No limit",
      appsLimit: "based on your needs",
      moreApps: "",
      chainAccess: "No limit",
    },
  }

  return (
    <>
      <Box sx={{ textAlign: "left" }}>
        <Title className="plan-data-overview title" mb={16} mt={32} order={3}>
          Flexible plans that grow with your app
        </Title>
        <Text mb={32}>
          Scalable plans because your needs change as yous app grows. All plans access to
          Pocket Network multichain infrastructure with our chain!
        </Text>
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Title className="plan-data title" mb={16} mt={32} order={3}>
          {planDetails[planType as keyof typeof planDetails].title}
        </Title>
        <Text mb={32}>
          {planDetails[planType as keyof typeof planDetails].description}
        </Text>
        <Text mb={32}>
          {planDetails[planType as keyof typeof planDetails].description2}
        </Text>
      </Box>
      <Grid>
        <Grid.Col sm={3} xs={12}>
          <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
            {planDetailsTitles.pricing}
          </Title>
          <Text mb={32}>
            {ReactHtmlParser(planDetails[planType as keyof typeof planDetails].pricing)}
          </Text>
        </Grid.Col>
        <Grid.Col sm={3} xs={12}>
          <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
            {planDetailsTitles.relayLimit}
          </Title>
          <Text mb={32}>
            {planDetails[planType as keyof typeof planDetails].relayLimit}
          </Text>
        </Grid.Col>
        <Grid.Col sm={3} xs={12}>
          <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
            {planDetailsTitles.chainAccess}
          </Title>
          <Text mb={32}>
            {planDetails[planType as keyof typeof planDetails].chainAccess}
          </Text>
        </Grid.Col>
        <Grid.Col sm={3} xs={12}>
          <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
            {planDetailsTitles.appsLimit}
          </Title>
          <Text mb={32}>
            {planDetails[planType as keyof typeof planDetails].appsLimit}
          </Text>
        </Grid.Col>
      </Grid>
    </>
  )
}
