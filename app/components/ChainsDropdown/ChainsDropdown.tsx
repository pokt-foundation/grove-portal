import { Select } from "@mantine/core"
import { useMemo, useRef } from "react"
import { LuSearch } from "react-icons/lu"
import { BlockchainsQuery } from "~/models/portal/sdk"

type ChainsDropdownProps = {
  chains: BlockchainsQuery["blockchains"]
  onChange: (chain: string | null) => void
  width?: string | number
}

const ChainsDropdown = ({ chains, onChange, width }: ChainsDropdownProps) => {
  const addNewChainSelectRef = useRef<HTMLInputElement>(null)

  const selectChainData = useMemo(() => {
    return chains.map((chain) => ({
      label: chain?.description ?? "",
      value: chain?.id ?? "",
    }))
  }, [chains])

  return (
    <Select
      ref={addNewChainSelectRef}
      searchable
      aria-label="Add new"
      data={selectChainData}
      leftSection={<LuSearch size={18} />}
      placeholder="Search Network"
      rightSection={<></>}
      rightSectionWidth={0}
      w={width}
      onChange={onChange}
    />
  )
}

export default ChainsDropdown
