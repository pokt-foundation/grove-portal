import { UserLB } from "@pokt-foundation/portal-types"
import { ActionFunction, json, LoaderFunction } from "@remix-run/node"
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react"
import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react"
import invariant from "tiny-invariant"
import Button from "~/components/shared/Button"
import Card, { links as CardLinks } from "~/components/shared/Card"
import CardList, { links as CardListLinks } from "~/components/shared/CardList"
import Grid from "~/components/shared/Grid"
import Group from "~/components/shared/Group"
import Select, { links as SelectLinks } from "~/components/shared/Select"
import { getLBUserApplications } from "~/models/portal.server"
import { subscriptionsCookie } from "~/utils/cookies.server"
import { getPoktId, requireUserProfile } from "~/utils/session.server"

export const links = () => {
  return [...CardLinks(), ...CardListLinks(), ...SelectLinks()]
}

type LoaderData = {
  apps: UserLB[]
  userId: string
  cart: Subscription[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const profile = await requireUserProfile(request)
  const apps = await getLBUserApplications(request)

  const cookieHeader = request.headers.get("Cookie")
  const cookie: { cart: Subscription[] } = (await subscriptionsCookie.parse(
    cookieHeader,
  )) || { cart: [] }

  return json<LoaderData>(
    {
      apps,
      userId: getPoktId(profile.id),
      cart: cookie.cart,
    },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

type Errors = {
  app?: Error
  quantity?: Error
  pokt?: Error
  cost?: Error
}

type Error = {
  name: string
  error: boolean
  message: string
}

export type Subscription = {
  app: string
  quantity: string
  pokt: string
  cost: string
}

type ActionResponse =
  | {
      success: false
      errors: Errors
    }
  | {
      success: true
      subscription: Subscription
      cart: Subscription[]
    }

export const action: ActionFunction = async ({ request }) => {
  let success = true
  let errors: Errors = {}
  const formData = await request.formData()
  const app = formData.get("subscription-app")
  const quantity = formData.get("subscription-quantity")

  if (!app) {
    success = false
    errors = {
      ...errors,
      app: {
        name: "subscription-app",
        error: true,
        message: "An application must be selected",
      },
    }
  }

  if (!quantity) {
    success = false
    errors = {
      ...errors,
      quantity: {
        name: "subscription-quantity",
        error: true,
        message: "A quantity must be set",
      },
    }
  }

  if (success === false) {
    return json<ActionResponse>({
      success,
      errors,
    })
  }

  invariant(app && typeof app === "string", "An application must be selected")
  invariant(quantity && typeof quantity === "string", "A quantity must be set")

  const cookieHeader = request.headers.get("Cookie")
  const cookie: { cart: Subscription[] } = (await subscriptionsCookie.parse(
    cookieHeader,
  )) || { cart: [] }

  const pokt = (Number(quantity) / 210.41).toFixed(2)
  const cost = (Number(pokt) / 2).toFixed(2)
  const subscription = {
    app,
    quantity,
    pokt,
    cost,
  }

  if (cookie.cart.find((sub) => sub.app === subscription.app)) {
    cookie.cart = cookie.cart.map((sub) => {
      if (sub.app && subscription.app) {
        return subscription
      }
      return sub
    })
  } else {
    cookie.cart = [...cookie.cart, subscription]
  }

  return json<ActionResponse>(
    {
      success,
      subscription,
      cart: cookie.cart,
    },
    {
      headers: {
        "Set-Cookie": await subscriptionsCookie.serialize(cookie),
      },
    },
  )
}

export default function RentToOwnLayout() {
  const { apps, cart: initialCart } = useLoaderData() as LoaderData
  const action = useActionData() as ActionResponse
  const [cart, setCart] = useState<Subscription[]>(initialCart)
  const [suggestedQuantities, setSuggestedQuantities] = useState([
    {
      label: "1 Million",
      value: "100000000",
    },
    {
      label: "2 Million",
      value: "200000000",
    },
    {
      label: "5 Million",
      value: "500000000",
    },
    {
      label: "10 Million",
      value: "1000000000",
    },
    {
      label: "20 Million",
      value: "2000000000",
    },
    {
      label: "50 Million",
      value: "5000000000",
    },
    {
      label: "100 Million",
      value: "10000000000",
    },
  ])
  const [quantityError, setQuantityError] = useState(false)
  const handleQuanityCreate = (query: string) => {
    const parsed = parseInt(query, 10)
    if (isNaN(parsed)) {
      setQuantityError(true)
      return
    }
    setSuggestedQuantities((current) => [
      ...current,
      {
        label: query,
        value: String(parsed),
      },
    ])
  }
  const handleQuantityChange = (value: string | null) => {
    const pokt = (Number(value) / 210.41).toFixed(2)
    const cost = (Number(pokt) / 2).toFixed(2)
    setPoktReceived(pokt)
    setCost(cost)
    setQuantityError(false)
  }

  const [poktReceived, setPoktReceived] = useState<string>(String(0))
  const [cost, setCost] = useState<string>(String(0))

  useEffect(() => {
    if (action?.success) {
      setCart(action.cart)
    }
  }, [action])

  return (
    <Grid gutter={32}>
      <Grid.Col md={8}>
        <Card>
          <div className="pokt-card-header">
            <h3>Applications</h3>
          </div>
          <div>
            <Form method="post">
              <Select
                name="subscription-app"
                label="Application"
                placeholder="Select Application"
                searchable
                clearable
                nothingFound="No options"
                data={apps.map((app) => ({
                  label: app.name,
                  value: app.id,
                }))}
                filter={(value, item) =>
                  item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
                  item.value.toLowerCase().includes(value.toLowerCase().trim())
                }
                error={
                  !action?.success && action?.errors?.app?.error
                    ? action.errors.app.message
                    : null
                }
              />
              <Select
                name="subscription-quantity"
                label="Relay Quantity"
                placeholder="Select Relay Quanity"
                searchable
                clearable
                nothingFound="No options"
                data={suggestedQuantities}
                filter={(value, item) =>
                  item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
                  String(item.value).toLowerCase().includes(value.toLowerCase().trim())
                }
                error={
                  !action?.success && action?.errors?.quantity?.error
                    ? action.errors.quantity.message
                    : quantityError
                    ? "Quantity must be a number"
                    : false
                }
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={handleQuanityCreate}
                onChange={handleQuantityChange}
              />
              <Group align="center" position="apart">
                <div>
                  <h4>POKT Received</h4>
                  <p>{poktReceived}</p>
                </div>
                <div>
                  <h4>Cost</h4>
                  <p>{cost}</p>
                </div>
              </Group>
              <Button type="submit">Add To Subscription</Button>
            </Form>
          </div>
        </Card>
      </Grid.Col>
      <Grid.Col md={4}>
        <Card>
          <div className="pokt-card-header">
            <h3>Subscription</h3>
          </div>
          <Form method="post" action="/api/stripe/checkout-session">
            {cart.map((item) => (
              <Group key={item.app} align="center" position="apart">
                <input
                  hidden
                  type="text"
                  name="product"
                  value={JSON.stringify({
                    id: item.app,
                    name: apps.find((app) => app.id === item.app)?.name,
                    quantity: item.quantity,
                  })}
                />
                <div>
                  <p>{apps.find((app) => app.id === item.app)?.name}</p>
                </div>
                <div>
                  <p>{item.quantity}</p>
                </div>
                <div>
                  <p>${item.pokt}</p>
                </div>
                <div>
                  <p>${item.cost}</p>
                </div>
              </Group>
            ))}
            <Button type="submit" fullWidth mt={32}>
              Checkout
            </Button>
          </Form>
        </Card>
      </Grid.Col>
    </Grid>
  )
}
