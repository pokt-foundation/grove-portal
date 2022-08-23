import { Box, Title, Text } from "@mantine/core"
import ReactHtmlParser from "react-html-parser"
import styles from "./styles.css"
import Grid from "~/components/shared/Grid"
import { useTranslate } from "~/context/TranslateContext"

/* c8 ignore next */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface AppPlansOverviewProps {
  planType: string
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
          {
            AppPlansOverview.planDetails[
              planType as keyof typeof AppPlansOverview.planDetails
            ].title
          }
        </Title>
        <Text mb={32}>
          {
            AppPlansOverview.planDetails[
              planType as keyof typeof AppPlansOverview.planDetails
            ].description
          }
        </Text>
        <Text mb={32}>
          {
            AppPlansOverview.planDetails[
              planType as keyof typeof AppPlansOverview.planDetails
            ].description2
          }
        </Text>
      </Box>
      <Grid>
        <Grid.Col sm={3} xs={12}>
          <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
            {AppPlansOverview.planDetailsTitles.pricing}
          </Title>
          <Text mb={32}>
            {ReactHtmlParser(
              AppPlansOverview.planDetails[
                planType as keyof typeof AppPlansOverview.planDetails
              ].pricing,
            )}
          </Text>
        </Grid.Col>
        <Grid.Col sm={3} xs={12}>
          <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
            {AppPlansOverview.planDetailsTitles.relayLimit}
          </Title>
          <Text mb={32}>
            {
              AppPlansOverview.planDetails[
                planType as keyof typeof AppPlansOverview.planDetails
              ].relayLimit
            }
          </Text>
        </Grid.Col>
        <Grid.Col sm={3} xs={12}>
          <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
            {AppPlansOverview.planDetailsTitles.chainAccess}
          </Title>
          <Text mb={32}>
            {
              AppPlansOverview.planDetails[
                planType as keyof typeof AppPlansOverview.planDetails
              ].chainAccess
            }
          </Text>
        </Grid.Col>
        <Grid.Col sm={3} xs={12}>
          <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
            {AppPlansOverview.planDetailsTitles.appsLimit}
          </Title>
          <Text mb={32}>
            {
              AppPlansOverview.planDetails[
                planType as keyof typeof AppPlansOverview.planDetails
              ].appsLimit
            }
          </Text>
        </Grid.Col>
      </Grid>
    </>
  )
}
