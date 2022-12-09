import { Button, Container, Select } from "@pokt-foundation/pocket-blocks"
import { LinksFunction } from "@remix-run/node"
import { useFetcher } from "@remix-run/react"
import { useState } from "react"
import Card, { links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { PayPlanType } from "~/models/portal/sdk"

export const links: LinksFunction = () => [...CardLinks(), ...TextInputLinks()]

export default function CustomPayPlan() {
  const [selectedPlanType, setSelectedPlanType] = useState<string | null>(null)
  const { Form, ...updatePlanFetcher } = useFetcher()

  const plans = Object.values(PayPlanType)

  return (
    <Container size="xl">
      <Card>
        <div className="pokt-card-header">
          <h3>Update Pay Plan</h3>
        </div>
        <Form action="/api/updatePlan" method="post">
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
        {updatePlanFetcher.data && updatePlanFetcher.data.error && (
          <div>{JSON.stringify(updatePlanFetcher.data)}</div>
        )}
      </Card>
    </Container>
  )
}
