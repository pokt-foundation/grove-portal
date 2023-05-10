import { Grid, Navbar } from "@pokt-foundation/pocket-blocks"
import LinksGroup, { LinksGroupProps } from "../LinksGroup/LinksGroup"

const mockdata: LinksGroupProps[] = [
  { label: "Introduction", link: "/", size: "lg", slug: "introduction" },
  { label: "What is the Portal?", link: "/", slug: "what-is-the-portal" },
  { label: "Supported Chains", link: "/", slug: "supported-chains" },
  { label: "Quickstart", link: "/", size: "lg", slug: "quickstart" },
  {
    label: "Get and endpoint for your wallet",
    link: "/",
    slug: "get-and-endpoint-for-your-wallet",
  },
  { label: "Support", link: "/", slug: "support" },
  {
    label: "Navigating the Portal",
    link: "/",
    size: "lg",
    slug: "navigating-the-portal",
  },
  {
    label: "App Overview",
    initiallyOpened: true,
    link: "/",
    links: [
      {
        label: "Manage endpoints",
        link: "/",
        nesting_level: 1,
        slug: "manage-endpoints",
        links: [
          {
            label: "Manage endpoints 1",
            link: "/",
            nesting_level: 2,
            slug: "manage-endpoints-1",
          },
        ],
      },
    ],
    slug: "app-overview",
  },
  { label: "Requests", link: "/", slug: "requests" },
  { label: "Security", link: "/", slug: "security" },
  { label: "Notifications", link: "/", slug: "notifications" },
  { label: "Plan Details", link: "/", slug: "plan-details" },
  { label: "Team Management", link: "/", slug: "team-management" },
  { label: "Powered by Pocket", link: "/", size: "lg", slug: "powered-by-pocket" },
  { label: "What is Pocket Network?", link: "/", slug: "what-is-pocket-network" },
  { label: "Pocket Network Links", link: "/", slug: "pocket-network-links" },
  { label: "Network", link: "/", size: "lg", slug: "network" },
]

export function Sidebar() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />)

  return (
    <Navbar
      bg="#0a0e13"
      height="unset"
      p="16px 8px 16px 56px"
      width={{ sm: 300 }}
      withBorder={false}
    >
      <Navbar.Section grow>
        <Grid
          sx={{
            flexDirection: "column",
          }}
        >
          {links}
        </Grid>
      </Navbar.Section>
    </Navbar>
  )
}
