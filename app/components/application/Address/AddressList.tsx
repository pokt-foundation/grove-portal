import { NavLink } from "@remix-run/react"
import { PaginatedData } from "~/routes/dashboard/addresses"
import { Group, Text } from "@mantine/core"
import styles from "./addressList.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

type AddressListProps = {
  paginate: PaginatedData
}

export const AddressList = ({ paginate }: AddressListProps) => {
  const url = new URL(location.href)
  const params = url.searchParams.toString()

  return (
    <>
      {paginate.data.map((item) => (
        <NavLink
          key={item.address}
          to={`${item.address}${params ? `?${params}` : ""}`}
          className={({ isActive }) => `list-link ${isActive ? "list-link-active" : ""}`}
        >
          <Text className="list-address">{item.address}</Text>
          <Group>
            <Text size="xs">Status: {item.status}</Text>
            <Text size="xs">Tokens: {item.stakedTokens}</Text>
          </Group>
        </NavLink>
      ))}
    </>
  )
}

export default AddressList
