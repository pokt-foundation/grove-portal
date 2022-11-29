import { Avatar, Badge } from "@mantine/core"
import { Button, Container, Select, Group } from "@pokt-foundation/pocket-blocks"
import { LinksFunction } from "@remix-run/node"
import { useState } from "react"
import Card, { links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"

export const links: LinksFunction = () => [...CardLinks(), ...TextInputLinks()]

export default function CustomPayPlan() {
  const [selectedPlanType, setSelectedPlanType] = useState<string | null>(null)

  const plans = ["Free", "Paid", "Custom"]

  return (
    <Container size="lg">
      <Card>
        <div className="pokt-card-header">
          <h3>Pay Plan Metrics</h3>
        </div>
        <Group>
          {plans.map((plan) => (
            <div key={plan}>{plan}</div>
          ))}
        </Group>
      </Card>
      <Card>
        <div className="pokt-card-header">
          <h3>Update Pay Plan</h3>
        </div>
        <Select
          data={["Custom", "Free", "Test"]}
          id="pay_plan_type"
          label="Plan Type"
          mb={16}
          placeholder="Plan Type"
          onChange={(e) => setSelectedPlanType(e)}
        />
        <TextInput label="Endpoint ID" mb={16} placeholder="Endpoint ID" />
        {selectedPlanType === "Custom" && (
          <TextInput label="Rate Limit" mb={16} placeholder="Rate Limit" type="number" />
        )}
        <Button mt={16} type="submit">
          Submit
        </Button>
      </Card>
    </Container>
  )
}
