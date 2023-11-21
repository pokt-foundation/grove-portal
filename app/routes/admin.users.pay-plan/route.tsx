import { Button, Card, Container, Select, TextInput } from "@mantine/core"
import { MetaFunction } from "@remix-run/node"
import { useFetcher } from "@remix-run/react"
import { useState } from "react"
import useActionNotification, {
  ActionNotificationData,
} from "~/hooks/useActionNotification"
import { PayPlanType } from "~/models/portal/sdk"

export const meta: MetaFunction = () => {
  return [
    {
      title: "Custom Pay Plan | Admin",
    },
  ]
}

export default function CustomPayPlan() {
  const [selectedPlanType, setSelectedPlanType] = useState<string | null>(null)
  const { Form, ...updatePlanFetcher } = useFetcher()

  const plans = Object.values(PayPlanType)

  const fetcherData = updatePlanFetcher.data as ActionNotificationData
  useActionNotification(fetcherData)

  return (
    <Container size="lg">
      <Card>
        <div className="pokt-card-header">
          <h3>Update Pay Plan</h3>
        </div>
        <Form action={"/api/admin/update-plan"} method="post">
          <Select
            data={plans}
            id="pay_plan_type"
            label="Plan Type"
            mb={16}
            name="type"
            placeholder="Plan Type"
            onChange={(e) => setSelectedPlanType(e)}
          />
          <TextInput label="Endpoint ID" mb={16} name="id" placeholder="Endpoint ID" />
          {selectedPlanType === PayPlanType.Enterprise && (
            <TextInput
              label="Rate Limit"
              mb={16}
              name="limit"
              placeholder="Rate Limit"
              type="number"
            />
          )}
          <Button disabled={updatePlanFetcher.state !== "idle"} mt={16} type="submit">
            Submit
          </Button>
        </Form>
        {fetcherData && fetcherData.error && (
          <div>{JSON.stringify(updatePlanFetcher.data)}</div>
        )}
      </Card>
    </Container>
  )
}
