import {
  Title,
  Group,
  List,
  Text,
  Grid,
  MediaQuery,
  Select,
} from "@pokt-foundation/pocket-blocks"
import { json, LinksFunction, LoaderFunction, redirect } from "@remix-run/node"
import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { getRequiredServerEnvVar } from "~/utils/environment"
import styles from "./styles.css"

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
]

type LoaderData = {
  blockchains: unknown[]
}
type Sort = "id" | "blockchain"
type Filter = "all" | "active" | "inactive"

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url)

  if (!params.id) {
    return redirect("/admin/blockchains/0001")
  }

  try {
    const res = await fetch(`${getRequiredServerEnvVar("PHD_API_URL")}/v1/blockchain`, {
      headers: {
        Authorization: getRequiredServerEnvVar("PHD_API_KEY"),
        "Content-Type": "application/json",
      },
    })
    let chains = await res.json()
    const sort = url.searchParams.get("sort")
    const filter = url.searchParams.get("filter")

    if (sort) {
      chains = chains.sort((a, b) => (a[sort] > b[sort] ? 1 : -1))
    }

    if (filter && filter !== "all") {
      const state = filter === "active" ? true : false
      chains = chains.filter((chain) => chain.active === state)
    }

    return json<LoaderData>({
      blockchains: chains,
    })
  } catch (error) {}
}

export default function Analytics() {
  const { blockchains } = useLoaderData() as LoaderData
  const params = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <Grid gutter={32}>
      <Grid.Col>
        <Group
          position="apart"
          sx={(theme) => ({
            paddingBottom: theme.spacing.lg,
            borderBottom: `1px solid ${
              theme.colorScheme === "dark" ? theme.colors.navy[4] : theme.colors.gray[2]
            }`,
          })}
        >
          <Title order={1}>Blockchains</Title>
          <Group>
            <Select
              size="xs"
              label="Filter"
              placeholder="Filter"
              data={[
                {
                  value: "all",
                  label: "All",
                },
                {
                  value: "active",
                  label: "Active",
                },
                {
                  value: "inactive",
                  label: "In-Active",
                },
              ]}
              defaultValue={searchParams.get("filter") ?? "all"}
              onChange={(value) => {
                searchParams.set("filter", value as string)
                setSearchParams(searchParams)
              }}
            />

            <Select
              size="xs"
              label="Sort"
              placeholder="Sort"
              data={[
                {
                  value: "id",
                  label: "ID",
                },
                {
                  value: "blockchain",
                  label: "Blockchain",
                },
              ]}
              defaultValue={searchParams.get("sort") ?? "id"}
              onChange={(value) => {
                searchParams.set("sort", value as string)
                setSearchParams(searchParams)
              }}
            />
          </Group>
        </Group>
      </Grid.Col>
      <Grid.Col md={5} lg={4} xl={3}>
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <Select
            label="Blockchains"
            placeholder="Select a Blockchain"
            data={blockchains.map((chain) => ({
              value: chain.id,
              label: `${chain.id} ${chain.blockchain}`,
            }))}
            defaultValue={params.id}
            onChange={(value) => navigate(`/admin/blockchains/${value}`)}
          />
        </MediaQuery>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <List
            className="chains-nav"
            sx={(theme) => ({
              maxHeight: "calc(100vh - 260px)", // headerHeight, shellPadding, containerPadding, title/filter/sort height
              overflow: "auto",
              borderRight: `1px solid ${
                theme.colorScheme === "dark" ? theme.colors.navy[4] : theme.colors.gray[2]
              }`,
            })}
          >
            {blockchains &&
              blockchains.map((chain) => (
                <NavLink
                  className={({ isActive }) =>
                    clsx("nav-link", { "nav-link-active": isActive })
                  }
                  to={`${chain.id}?${searchParams.toString()}`}
                  key={chain.id}
                >
                  <Group>
                    <Text m="0">{chain.id}</Text>
                    <Text m="0">{chain.blockchain}</Text>
                  </Group>
                </NavLink>
              ))}
          </List>
        </MediaQuery>
      </Grid.Col>
      <Grid.Col md={7} lg={8} xl={9}>
        <Outlet />
      </Grid.Col>
    </Grid>
  )
}
