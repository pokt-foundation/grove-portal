import { Box, Title, Text, Grid } from "@pokt-foundation/pocket-blocks"
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
        <Title className="plan-data-overview title" mb={16} mt={32} order={3}>
          {AppPlansOverview.planDetailsTitles.overviewHeader}
        </Title>
        <Text mb={32}>{AppPlansOverview.planDetailsTitles.overviewDescription}</Text>
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Title className="plan-data title" mb={16} mt={32} order={3}>
          {AppPlansOverview.planDetails[planType].title}
        </Title>
        <Text mb={32}>{AppPlansOverview.planDetails[planType].description}</Text>
        <Text mb={32}>{AppPlansOverview.planDetails[planType].description2}</Text>
      </Box>
      <Grid>
        <Grid.Col sm={3} xs={12}>
          <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
            {AppPlansOverview.planDetailsTitles.pricing}
          </Title>
          <Text mb={32}>
            {ReactHtmlParser(AppPlansOverview.planDetails[planType].pricing)}
          </Text>
        </Grid.Col>
        <Grid.Col sm={3} xs={12}>
          <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
            {AppPlansOverview.planDetailsTitles.relayLimit}
          </Title>
          <Text mb={32}>{AppPlansOverview.planDetails[planType].relayLimit}</Text>
        </Grid.Col>
        <Grid.Col sm={3} xs={12}>
          <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
            {AppPlansOverview.planDetailsTitles.chainAccess}
          </Title>
          <Text mb={32}>{AppPlansOverview.planDetails[planType].chainAccess}</Text>
        </Grid.Col>
        <Grid.Col sm={3} xs={12}>
          <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
            {AppPlansOverview.planDetailsTitles.appsLimit}
          </Title>
          <Text mb={32}>{AppPlansOverview.planDetails[planType].appsLimit}</Text>
        </Grid.Col>
      </Grid>
    </>
  )
}
