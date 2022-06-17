import { Select } from "@mantine/core"
import { MetaFunction } from "@remix-run/node"
import { Form } from "@remix-run/react"
import { forwardRef } from "react"
import ChainWithImage, {
  AppEndpointProps,
  links as ChainWithImageLinks,
} from "~/components/application/ChainWithImage"
import Card, { links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { CHAIN_ID_PREFIXES } from "~/utils/chainUtils"

export const meta: MetaFunction = () => {
  return {
    title: "Create New Application",
  }
}

export const links = () => {
  return [...CardLinks(), ...TextInputLinks(), ...ChainWithImageLinks()]
}

const SelectItem = forwardRef<HTMLDivElement, AppEndpointProps>(
  ({ chain, label, ...others }: AppEndpointProps, ref) => (
    <div ref={ref} {...others}>
      <ChainWithImage chain={chain} label={label} />
    </div>
  ),
)

export default function CreateApp() {
  const chains = Array.from(CHAIN_ID_PREFIXES.entries()).map(([id, { name }]) => ({
    chain: name,
    label: name,
    value: id,
  }))
  return (
    <>
      <section>
        <Card>
          <div className="pokt-card-header">
            <h3>App Form</h3>
          </div>
          <Form>
            <TextInput label="Name" />
            <Select
              label="Chain"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              itemComponent={SelectItem}
              data={chains}
              filter={(value, item) =>
                item.chain.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.label?.toLowerCase().includes(value.toLowerCase().trim())
              }
            />
          </Form>
        </Card>
      </section>
      <section>
        <Card>
          <div className="pokt-card-header">
            <h3>Plan Options</h3>
          </div>
        </Card>
      </section>
    </>
  )
}
