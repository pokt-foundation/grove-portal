import { ActionFunction, json } from "@remix-run/node"
import { PayPlanType } from "~/models/portal/sdk"
import { Stripe, stripe } from "~/models/stripe/stripe.server"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredServerEnvVar } from "~/utils/environment"

function arrayBufferToBufferCycle(ab: ArrayBuffer) {
  var buffer = Buffer.alloc(ab.byteLength)
  var view = new Uint8Array(ab)
  for (var i = 0; i < buffer.length; i++) {
    buffer[i] = view[i]
  }
  return buffer
}

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url)
  // This is your Stripe CLI webhook secret for testing your endpoint locally.
  const endpointSecret = getRequiredServerEnvVar("STRIPE_WEBHOOK_SECRET")

  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405)
  }

  const body = await request.arrayBuffer()
  const buf = arrayBufferToBufferCycle(body)

  let event: Stripe.Event | null = null
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    try {
      const signature = request.headers.get("stripe-signature")
      if (!signature) throw new Error("no signature in header")

      event = stripe.webhooks.constructEvent(buf, signature, endpointSecret)
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, getErrorMessage(err))
      return json({ message: "Signature mismatch" }, 401)
    }
  }

  // Handle the event
  if (event) {
    switch (event.type) {
      case "checkout.session.completed":
        const sessionCompleted = event.data.object as Stripe.Checkout.Session

        if (
          sessionCompleted.subscription &&
          typeof sessionCompleted.subscription === "string"
        ) {
          const subscription = await stripe.subscriptions.update(
            sessionCompleted.subscription,
            {
              description: `${sessionCompleted.metadata?.endpoint_name}: ${sessionCompleted.metadata?.endpoint_id}`,
              metadata: sessionCompleted.metadata,
            },
          )
          // there is only ever 1 subscription item in our subscriptions so just grabbing it here
          await stripe.subscriptionItems.update(subscription.items.data[0].id, {
            metadata: sessionCompleted.metadata,
          })

          // update application plan and store subscription id
          await fetch(`${url.origin}/api/admin/update-plan`, {
            method: "post",
            headers: {
              "Content-Type": "Application/Json",
            },
            body: JSON.stringify({
              id: sessionCompleted.metadata?.endpoint_id,
              type: PayPlanType.PayAsYouGoV0,
              subscription: sessionCompleted.subscription,
            }),
          })
        }

        break
      case "customer.subscription.deleted":
        const subscriptionDeleted = event.data.object as Stripe.Subscription
        console.log(`Customer subscription deleted for ${subscriptionDeleted.id}!`)

        const appIdDeleted = subscriptionDeleted.metadata.endpoint_id

        await fetch("/api/admin/update-plan", {
          method: "post",
          headers: {
            "Content-Type": "Application/Json",
          },
          body: JSON.stringify({
            id: appIdDeleted,
            type: PayPlanType.FreetierV0,
            subscription: "",
          }),
        })

        break
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`)
        return json({ message: "Unhandled event type" }, 404)
    }
  }

  return json({ success: true }, 200)
}
