import { Box, Title, Text, Grid } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import ReactHtmlParser from "react-html-parser"
import styles from "./styles.css"
import { useTranslate } from "~/context/TranslateContext"
import { PayPlanType } from "~/models/portal/sdk"

/* c8 ignore next */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface AppPlansOverviewProps {
  planType: PayPlanType
}

export default function AppPlansOverview({ planType }: AppPlansOverviewProps) {
  const {
    t: { AppPlansOverview },
  } = useTranslate()

  return (
    <>
      <Box sx={{ textAlign: "left" }}>
        <Title className="plan-data-overview title" mt={20} order={3}>
          {AppPlansOverview.planDetailsTitles.overviewHeader}
        </Title>
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Title className="plan-data title" mt={20} order={3}>
          {AppPlansOverview.planDetails[planType].title}
        </Title>
        <Text mt={16}>{AppPlansOverview.planDetails[planType].description}</Text>
        <Text mt={16}>{AppPlansOverview.planDetails[planType].description2}</Text>
      </Box>

      <Grid columns={5} mb={32} mt={8}>
        <Grid.Col md={1} xs={5}>
          <Title className="plan-data-highlights" mt={20} order={5}>
            {AppPlansOverview.planDetailsTitles.pricing}
          </Title>
          <Text mt={16}>
            {ReactHtmlParser(AppPlansOverview.planDetails[planType].pricing)}
          </Text>
        </Grid.Col>

        <Grid.Col md={1} xs={5}>
          <Title className="plan-data-highlights" mt={20} order={5}>
            {AppPlansOverview.planDetailsTitles.relayLimit}
          </Title>
          <Text mt={16}>{AppPlansOverview.planDetails[planType].relayLimit}</Text>
        </Grid.Col>

        <Grid.Col md={1} xs={5}>
          <Title className="plan-data-highlights" mt={20} order={5}>
            {AppPlansOverview.planDetailsTitles.chainAccess}
          </Title>
          <Text mt={16}>{AppPlansOverview.planDetails[planType].chainAccess}</Text>
        </Grid.Col>

        <Grid.Col md={1} xs={5}>
          <Title className="plan-data-highlights" mt={20} order={5}>
            {AppPlansOverview.planDetailsTitles.appsLimit}
          </Title>
          <Text mt={16}>{AppPlansOverview.planDetails[planType].appsLimit}</Text>
        </Grid.Col>

        <Grid.Col md={1} xs={5}>
          <Box className="enterprise-solutions-box">
            <Title className="enterprise-solutions-box__title" order={5}>
              {AppPlansOverview.planDetailsTitles.enterpriseSolutions}
            </Title>
            <Text mt={8} weight="lighter">
              {AppPlansOverview.planDetails.enterpriseSolutions.description}{" "}
              <Text color="var(--color-primary-main)" component="span">
                <Link to="/dashboard/contact-sales">
                  {AppPlansOverview.planDetails.enterpriseSolutions.contactUS}
                </Link>
              </Text>
            </Text>
          </Box>
        </Grid.Col>
      </Grid>
    </>
  )
}
