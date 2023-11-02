import {
  Anchor,
  Button,
  Flex,
  Grid,
  Group,
  MediaQuery,
  Stack,
  Title,
} from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import PortalLoader from "~/components/PortalLoader"

export default function LandingView() {
  return (
    <Grid gutter={0} h="100vh">
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Grid.Col span={7}>
          <Flex
            align="center"
            bg="green"
            h="100vh"
            justify="center"
            p="xl"
            pos="relative"
          >
            <img
              alt="Grove logo"
              loading="lazy"
              src="/grove-logo.svg"
              style={{
                width: "75px",
                position: "absolute",
                left: "22px",
                top: "28px",
              }}
            ></img>
            <PortalLoader size="lg" />
          </Flex>
        </Grid.Col>
      </MediaQuery>
      <Grid.Col lg={5} md={5} sm={5} xs={12}>
        <Flex direction="column" h="100%" justify="center">
          <Stack justify="center" px="xl" spacing={55} style={{ flexGrow: 1 }}>
            <Title align="center" order={2}>
              Get started
            </Title>
            <Grid justify="center">
              <Grid.Col lg={4} md={6} sm={12}>
                <Button fullWidth component={Link} to="/api/auth/auth0">
                  Log in
                </Button>
              </Grid.Col>
              <Grid.Col lg={4} md={6} sm={12}>
                <Button fullWidth component={Link} to="/api/auth/auth0?signup=true">
                  Sign up
                </Button>
              </Grid.Col>
            </Grid>
          </Stack>
          <Stack align="center" mb="xl" spacing="xl">
            <img
              alt="Grove logo"
              loading="lazy"
              src="/grove/grove-logo-icon-green.svg"
              style={{
                width: "107px",
              }}
            ></img>
            <Group>
              <Anchor
                href="https://www.grove.city"
                rel="noreferrer"
                target="_blank"
                variant="text"
              >
                About
              </Anchor>
              <Anchor
                href="https://docs.grove.city/"
                rel="noreferrer"
                target="_blank"
                variant="text"
              >
                Docs
              </Anchor>
              <Anchor
                href="https://www.grove.city/pricing"
                rel="noreferrer"
                target="_blank"
                variant="text"
              >
                Pricing
              </Anchor>
              <Anchor
                href="https://www.grove.city/enterprise"
                rel="noreferrer"
                target="_blank"
                variant="text"
              >
                Enterprise
              </Anchor>
            </Group>
            <Group>
              <Anchor
                c="dimmed"
                fz="xs"
                href="https://www.grove.city/terms"
                rel="noreferrer"
                target="_blank"
                variant="text"
              >
                Terms of use
              </Anchor>
              <Anchor
                c="dimmed"
                fz="xs"
                href="https://www.grove.city/privacy"
                rel="noreferrer"
                target="_blank"
                variant="text"
              >
                Privacy Policy
              </Anchor>
            </Group>
          </Stack>
        </Flex>
      </Grid.Col>
    </Grid>
  )
}
