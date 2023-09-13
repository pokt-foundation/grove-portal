import { Divider } from "@mantine/core"
import { closeAllModals } from "@mantine/modals"
import { Button, Container, Group, LoadingOverlay } from "@pokt-foundation/pocket-blocks"
import { useNavigation } from "@remix-run/react"
import React, { useMemo, useState } from "react"
import ChainsDropdown from "~/components/ChainsDropdown/ChainsDropdown"
import ModalHeader from "~/components/ModalHeader"
import PortalLoader from "~/components/PortalLoader"
import { Blockchain } from "~/models/portal/sdk"
import ChainsTable from "~/routes/account.$accountId.$appId.security/components/ChainsTable"
import useCommonStyles from "~/styles/commonStyles"

type ApprovedChainsModalProps = {
  blockchains: Blockchain[]
  approvedChainsIds: string[]
}

const ApprovedChainsModal = ({
  blockchains,
  approvedChainsIds,
}: ApprovedChainsModalProps) => {
  const { state } = useNavigation()
  const { classes: commonClasses } = useCommonStyles()
  // const { appId, accountId } = useParams()
  // const fetcher = useFetcher()
  const [selectedBlockchainsIds, setSelectedBlockchainsIds] = useState<string[]>([])

  const dropdownChains = useMemo(
    () =>
      blockchains.filter(
        ({ id: blockchainId }) =>
          !selectedBlockchainsIds.some((id) => id === blockchainId) &&
          !approvedChainsIds.some((id) => id === blockchainId),
      ),
    [blockchains, selectedBlockchainsIds, approvedChainsIds],
  )

  const deleteSelectedChain = (chainId: string) => {
    console.log(chainId)
    setSelectedBlockchainsIds((ids) => ids.filter((id) => chainId !== id))
  }

  // TODO: Submit chains ids
  // const addApprovedChains = () => {
  //   fetcher.submit(....)
  // }

  return (
    <>
      {state === "idle" ? (
        <Container>
          <ModalHeader
            subtitle="Limits the Endpoints to be used only with specific chains."
            title="Approved Chains"
            onDiscard={closeAllModals}
          />
          <ChainsDropdown
            chains={dropdownChains}
            onChange={(val: string) => {
              console.log(val)
              setSelectedBlockchainsIds((ids) => [...ids, val])
            }}
          />
          {selectedBlockchainsIds.length > 0 && (
            <ChainsTable
              blockchains={blockchains}
              selectedBlockchainsIds={selectedBlockchainsIds}
              onDeleteChain={(chainId) => deleteSelectedChain(chainId)}
            />
          )}
          <Divider my={32} />
          <Group position="right">
            <Button
              classNames={{ root: commonClasses.grayOutlinedButton }}
              color="gray"
              fw={400}
              fz="sm"
              type="button"
              variant="outline"
              w="156px"
              onClick={() => closeAllModals()}
            >
              Discard
            </Button>
            <Button
              disabled={selectedBlockchainsIds.length === 0}
              fw={400}
              fz="sm"
              px="xs"
              type="submit"
              w="156px"
            >
              Save
            </Button>
          </Group>
        </Container>
      ) : (
        <LoadingOverlay
          visible
          loader={<PortalLoader message="Adding approved chains..." />}
        />
      )}
    </>
  )
}

export default ApprovedChainsModal
