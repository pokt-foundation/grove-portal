import {
  Title,
  Group,
  List,
  Text,
  Grid,
  MediaQuery,
  Select,
  Box,
  Anchor,
} from "@pokt-foundation/pocket-blocks"
import { json, LinksFunction, LoaderFunction, redirect } from "@remix-run/node"
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react"
import clsx from "clsx"
import { useEffect, useState } from "react"
import styles from "./styles.css"
import { getRequiredServerEnvVar } from "~/utils/environment"

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
]

export type Blockchain = {
  id: string
  blockchain: string
  active: boolean
  description: string
  altruist: string
  chainID: string
  blockchainAliases: string[]
  redirects: {
    alias: string
    domain: string
    loadBalancerID: string
  }[]
  syncCheckOptions: {
    body: string
    resultKey: string
    allowance: number
  }
}

type LoaderData = {
  blockchains: Blockchain[]
}
type Sort = "id" | "blockchain"
type Filter = "all" | "active" | "inactive"

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)

  try {
    const res = await fetch(`${getRequiredServerEnvVar("PHD_API_URL")}/v1/blockchain`, {
      headers: {
        Authorization: getRequiredServerEnvVar("PHD_API_KEY"),
        "Content-Type": "application/json",
      },
    })
    let chains = (await res.json()) as Blockchain[]
    const sort = url.searchParams.get("sort")
    const filter = url.searchParams.get("filter")

    if (sort) {
      chains = chains.sort((a: any, b: any) => (a[sort] > b[sort] ? 1 : -1))
    }

    if (filter && filter !== "all") {
      const state = filter === "active"
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

  if (params.id) {
    return <Outlet />
  }

  return (
    <div>
      <Group
        position="apart"
        sx={(theme) => ({
          paddingBottom: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
          borderBottom: `1px solid ${
            theme.colorScheme === "dark" ? theme.colors.navy[4] : theme.colors.gray[2]
          }`,
        })}
      >
        <Title order={1}>Blockchains</Title>
        <Group>
          <Select
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
            label="Filter"
            placeholder="Filter"
            size="xs"
            onChange={(value) => {
              searchParams.set("filter", value as string)
              setSearchParams(searchParams)
            }}
          />

          <Select
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
            label="Sort"
            placeholder="Sort"
            size="xs"
            onChange={(value) => {
              searchParams.set("sort", value as string)
              setSearchParams(searchParams)
            }}
          />
        </Group>
      </Group>
      <List className="chains-nav">
        {blockchains &&
          blockchains.map((chain) => (
            <Link key={chain.id} to={`${chain.id}?${searchParams.toString()}`}>
              <Box
                sx={(theme) => ({
                  padding: 16,
                  borderRadius: theme.radius.md,
                  ":hover": {
                    backgroundColor: theme.colors.navy[4],
                  },
                })}
              >
                <Grid>
                  <Grid.Col sm={3}>
                    <Text m="0">{chain.id}</Text>
                  </Grid.Col>
                  <Grid.Col sm={3}>
                    <Text m="0">{chain.blockchain}</Text>
                  </Grid.Col>
                  <Grid.Col offsetSm={3} sm={3}>
                    <Text m="0">{String(chain.active)}</Text>
                  </Grid.Col>
                </Grid>
              </Box>
            </Link>
          ))}
      </List>
    </div>
  )
}
