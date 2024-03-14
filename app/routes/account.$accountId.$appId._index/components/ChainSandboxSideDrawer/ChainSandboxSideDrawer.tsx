import { Drawer } from "@mantine/core"
import React, { useEffect } from "react"
import ChainSandbox from "app/components/ChainSandbox"
import useChainSandboxContext from "~/components/ChainSandbox/state"
import { Blockchain } from "~/models/portal/sdk"

type ChainSandboxSideDrawerProps = {
  blockchain?: Blockchain
  chains: Blockchain[]
  onSideDrawerClose: () => void
}

const ChainSandboxSideDrawer = ({
  blockchain,
  chains,
  onSideDrawerClose,
}: ChainSandboxSideDrawerProps) => {
  const { dispatch } = useChainSandboxContext()

  /*
    This is necessary because the blockchain prop can change over time, and without this, changes to the blockchain
    prop would not be reflected in the component after the initial render. The component is mounted only once, when
    route is loaded, since this is how Mantine Drawer works.
  */
  useEffect(() => {
    if (blockchain) {
      dispatch({ type: "SET_SELECTED_CHAIN", payload: blockchain })
    }
  }, [blockchain, dispatch])

  const handleSideDrawerClose = () => {
    dispatch({ type: "RESET_STATE" })
    onSideDrawerClose()
  }

  return (
    <Drawer
      opened={!!blockchain}
      padding="lg"
      position="right"
      size={800}
      onClose={handleSideDrawerClose}
    >
      <ChainSandbox chains={chains} />
    </Drawer>
  )
}

export default ChainSandboxSideDrawer
