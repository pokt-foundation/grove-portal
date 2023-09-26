import { Anchor, Box, Title, Text, Grid } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import parse from "html-react-parser"
import styles from "./styles.css"
import { PayPlanType } from "~/models/portal/sdk"

/* c8 ignore next */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface AppPlansOverviewProps {
  planType: PayPlanType
}

export default function AppPlansOverview({ planType }: AppPlansOverviewProps) {
  const planDetails: {
    [PayPlanType.PayAsYouGoV0]: {
      title: "Pay As You Go"
      description: "250k free relays per day, per app. Beyond that, pay only for what you use. The counter resets every 24h but you’ll only get billed monthly. Even better, after 24 months of paid relays, you’ll receive POKT to stake for continued service. No more payments."
      description2: "No more sunk costs. Just fast, reliable infrastructure."
      pricing: "Pay per relay + 250K Free Relays"
      relayLimit: "No limit"
      appsLimit: "Up to 2 Applicaitions"
      chainAccess: "No limit"
    }
    [PayPlanType.FreetierV0]: {
      title: "Always Free"
      description: "Access to reliable, fast infrastructure. Free up to 250k relays per day."
      description2: ""
      pricing: "$0.00"
      relayLimit: "250k per app per day"
      appsLimit: "Up to 2 Applicaitions"
      chainAccess: "No limit"
    }
    [PayPlanType.TestPlanV0]: {
      title: "Always Free"
      description: "Access to reliable, fast infrastructure. Free up to 250k relays per day."
      description2: ""
      pricing: "$0.00"
      relayLimit: "250k per app per day"
      appsLimit: "Up to 2 Applicaitions"
      chainAccess: "No limit"
    }
    [PayPlanType.Enterprise]: {
      title: "Enterprise"
      description: "Custom plans for large scale apps."
      description2: ""
      pricing: "Contact Us"
      relayLimit: ""
      appsLimit: ""
      chainAccess: ""
    }
    enterpriseSolutions: {
      description: "Custom plans for large scale apps."
      contactUS: "Contact Us"
    }
  }

  return (
    <>
      <Box sx={{ textAlign: "left" }}>
        <Title className="plan-data-overview title" mt={20} order={3}>
          Flexible plans that grow with your app
        </Title>
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Title className="plan-data title" mt={20} order={3}>
          {planDetails[planType].title}
        </Title>
        <Text mt={16}>{planDetails[planType].description}</Text>
        <Text mt={16}>{planDetails[planType].description2}</Text>
      </Box>

      <Grid columns={5} mb={32} mt={8}>
        <Grid.Col md={1} xs={5}>
          <Title className="plan-data-highlights" mt={20} order={5}>
            Pricing
          </Title>
          <Text mt={16}>{parse(planDetails[planType].pricing)}</Text>
        </Grid.Col>

        <Grid.Col md={1} xs={5}>
          <Title className="plan-data-highlights" mt={20} order={5}>
            Relay Limit
          </Title>
          <Text mt={16}>{planDetails[planType].relayLimit}</Text>
        </Grid.Col>

        <Grid.Col md={1} xs={5}>
          <Title className="plan-data-highlights" mt={20} order={5}>
            {AppPlansOverview.planDetailsTitles.chainAccess}
          </Title>
          <Text mt={16}>Chain Access</Text>
        </Grid.Col>

        <Grid.Col md={1} xs={5}>
          <Title className="plan-data-highlights" mt={20} order={5}>
            Apps Limit
          </Title>
          <Text mt={16}>{planDetails[planType].appsLimit}</Text>
        </Grid.Col>

        <Grid.Col md={1} xs={5}>
          <Box className="enterprise-solutions-box">
            <Title className="enterprise-solutions-box__title" order={5}>
              We have Enterprise Solutions for you
            </Title>
            <Text mt={8} weight="lighter">
              Custom plans for large scale apps.
              <Anchor
                component={Link}
                rel="noreferrer"
                target="_blank"
                to="mailto:sales@pokt.network"
              >
                Contact Us
              </Anchor>
            </Text>
          </Box>
        </Grid.Col>
      </Grid>
    </>
  )
}
