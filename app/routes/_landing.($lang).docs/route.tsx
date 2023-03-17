import {
  Anchor,
  AppShell,
  Box,
  Button,
  Grid,
  Group,
  Header,
  IconMenu,
  MediaQuery,
  Navbar,
  NavLink,
  Text,
} from "@pokt-foundation/pocket-blocks"
import { json, LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node"
import {
  Link,
  Outlet,
  useSearchParams,
  useLoaderData,
  NavLink as RemixNavLink,
  useParams,
  useLocation,
} from "@remix-run/react"
import { useEffect, useState } from "react"
import styles from "./styles.css"
import { initCmsClient } from "~/models/cms/cms.server"
import { getDocsQuery } from "~/models/cms/sdk"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

export const meta: MetaFunction = () => {
  return {
    title: "Documentation | POKT",
  }
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

type DocsLoaderData = {
  docs: Documentation[]
}

type Documentation = getDocsQuery["documentation"][0] & {
  isActive: boolean
  children: getDocsQuery["documentation"]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const cms = initCmsClient()
  const docs = await cms.getDocs({
    filter: { status: { _eq: "published" } },
    sort: ["id"],
    language: params.lang !== undefined ? params.lang : "en-US",
  })

  const getChildren = (array: getDocsQuery["documentation"], parentId: string) => {
    return array.filter((doc) => doc.parent?.id === parentId)
  }
  const topLevel = docs.documentation.filter((doc) => !doc.parent)
  const nav = topLevel.map((doc) => {
    return {
      ...doc,
      isActive:
        doc.slug === params.slug ||
        getChildren(docs.documentation, doc.id).some((c) => c.slug === params.slug),
      children: getChildren(docs.documentation, doc.id),
    }
  })

  console.log(nav)

  return json<DocsLoaderData>({
    docs: nav,
  })
}

export default function Docs() {
  const { docs } = useLoaderData() as DocsLoaderData
  const [searchParams] = useSearchParams()
  const [appShellOpen, setAppShellOpen] = useState(false)

  useEffect(() => {
    // todo: create new event
    // trackEvent(AmplitudeEvents.LandingView)
  }, [])

  useEffect(() => {
    // todo: handle search
  }, [searchParams])

  return (
    <AppShell
      fixed={false}
      header={
        <Header height={60}>
          <Group>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Button onClick={() => setAppShellOpen((o) => !o)}>
                <IconMenu />
              </Button>
            </MediaQuery>
            <Text>Documentation</Text>
          </Group>
        </Header>
      }
      navbar={
        <Navbar
          fixed={false}
          hidden={!appShellOpen}
          hiddenBreakpoint="sm"
          p="md"
          sx={{
            backgroundColor: "transparent",
            border: "none",
          }}
          width={{ sm: 250, lg: 300 }}
        >
          <Navbar.Section grow mt="md">
            {docs?.map((item) => (
              <>
                {item.slug && (
                  <NavLink
                    key={item.id}
                    defaultOpened={item.isActive}
                    label={
                      <RemixNavLink
                        style={({ isActive }) => ({
                          color: isActive
                            ? "var(--mantine-color-blue-6)"
                            : "var(--mantine-color-gray-6)",
                        })}
                        to={item.slug}
                      >
                        {item.translations![0]?.title ?? item.slug}
                      </RemixNavLink>
                    }
                  >
                    {item.children &&
                      item.children.map((child) => (
                        <>
                          {child.slug && (
                            <NavLink
                              key={child.id}
                              label={
                                <RemixNavLink
                                  style={({ isActive }) => ({
                                    color: isActive
                                      ? "var(--mantine-color-blue-6)"
                                      : "var(--mantine-color-gray-6)",
                                  })}
                                  to={child.slug}
                                >
                                  {child.translations![0]?.title ?? child.slug}
                                </RemixNavLink>
                              }
                            />
                          )}
                        </>
                      ))}
                  </NavLink>
                )}
              </>
            ))}
          </Navbar.Section>
        </Navbar>
      }
    >
      <Outlet />
    </AppShell>
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <dialog color="red" title="Index Error">
        {error.message}
      </dialog>
    </div>
  )
}
