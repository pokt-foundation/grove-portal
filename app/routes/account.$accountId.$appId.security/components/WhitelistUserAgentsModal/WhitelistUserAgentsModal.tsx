import { Divider } from "@mantine/core"
import { closeAllModals } from "@mantine/modals"
import {
  Button,
  Container,
  Grid,
  Group,
  LoadingOverlay,
  TextInput,
} from "@pokt-foundation/pocket-blocks"
import { useNavigation } from "@remix-run/react"
import React, { Dispatch, useState } from "react"
import { SecurityReducerActions } from "../../view"
import ModalHeader from "~/components/ModalHeader"
import PortalLoader from "~/components/PortalLoader"
import AddSettingsButton from "~/routes/account.$accountId.$appId.security/components/AddSettingsButton"
import SimpleStringTable from "~/routes/account.$accountId.$appId.security/components/SimpleStringTable"
import useCommonStyles from "~/styles/commonStyles"

type WhitelistUserAgentsModalProps = {
  dispatch: Dispatch<SecurityReducerActions>
}

const WhitelistUserAgentsModal = ({ dispatch }: WhitelistUserAgentsModalProps) => {
  const { state } = useNavigation()
  const { classes: commonClasses } = useCommonStyles()
  // const { appId, accountId } = useParams()
  // const fetcher = useFetcher()
  const [selectedUserAgents, setSelectedUserAgents] = useState<string[]>([])
  const [inputUserAgent, setInputUserAgent] = useState("")
  const deletedAgent = (deletedAgent: string) => {
    console.log(deletedAgent)
    setSelectedUserAgents((agents) => agents.filter((agent) => agent !== deletedAgent))
  }

  const addUserAgent = () => {
    setSelectedUserAgents((agents) => [...agents, inputUserAgent])
    setInputUserAgent("")
  }

  const handleSave = () => {
    dispatch({ type: "userAgents-add", payload: selectedUserAgents })
    closeAllModals()
  }

  return (
    <>
      {state === "idle" ? (
        <Container>
          <ModalHeader
            subtitle="Limits requests to only the HTTP User-Agents specified. If nothing is specified, all User-Agents will be accepted."
            title="Whitelist User-Agents"
            onDiscard={closeAllModals}
          />
          <Grid>
            <Grid.Col span="auto">
              <TextInput
                miw={300}
                placeholder="Type the user-agent here, then click ‘Add+’"
                value={inputUserAgent}
                onChange={(event) => setInputUserAgent(event.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span="content">
              <AddSettingsButton
                disabled={!inputUserAgent}
                onClick={() => addUserAgent()}
              />
            </Grid.Col>
          </Grid>
          {selectedUserAgents.length > 0 && (
            <SimpleStringTable
              data={selectedUserAgents}
              onDelete={(agent) => deletedAgent(agent)}
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
              disabled={selectedUserAgents.length === 0}
              fw={400}
              fz="sm"
              px="xs"
              type="submit"
              w="156px"
              onClick={handleSave}
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

export default WhitelistUserAgentsModal
