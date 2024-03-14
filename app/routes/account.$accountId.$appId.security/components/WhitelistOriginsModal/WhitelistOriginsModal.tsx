import {
  Divider,
  Button,
  Container,
  Grid,
  Group,
  LoadingOverlay,
  TextInput,
} from "@mantine/core"
import { useNavigation } from "@remix-run/react"
import React, { Dispatch, useState } from "react"
import { SecurityReducerActions } from "../../utils/stateReducer"
import ModalHeader from "~/components/ModalHeader"
import PortalLoader from "~/components/PortalLoader"
import useModals from "~/hooks/useModals"
import AddSettingsButton from "~/routes/account.$accountId.$appId.security/components/AddSettingsButton"
import SimpleStringTable from "~/routes/account.$accountId.$appId.security/components/SimpleStringTable"

type WhitelistOriginsModalProps = {
  dispatch: Dispatch<SecurityReducerActions>
}

const WhitelistOriginsModal = ({ dispatch }: WhitelistOriginsModalProps) => {
  const { state } = useNavigation()
  const { closeAllModals } = useModals()

  const [selectedWhitelistOrigins, setSelectedWhitelistOrigins] = useState<string[]>([])
  const [inputWhitelistOrigin, setInputWhitelistOrigin] = useState("")
  const deletedWhitelistOrigin = (deletedOrigin: string) => {
    setSelectedWhitelistOrigins((origins) =>
      origins.filter((origin) => origin !== deletedOrigin),
    )
  }

  const addWhitelistOrigin = () => {
    setSelectedWhitelistOrigins((origins) => [...origins, inputWhitelistOrigin])
    setInputWhitelistOrigin("")
  }

  const handleSave = () => {
    dispatch({ type: "origins-add", payload: selectedWhitelistOrigins })
    closeAllModals()
  }

  return (
    <>
      {state === "idle" ? (
        <Container>
          <ModalHeader
            subtitle="Limits requests to only the HTTP Origins specified."
            title="Whitelist Origins"
            onDiscard={closeAllModals}
          />
          <Grid py={24}>
            <Grid.Col span="auto">
              <TextInput
                miw={300}
                placeholder="Type the origin here, then click ‘Add+’"
                value={inputWhitelistOrigin}
                onChange={(event) => setInputWhitelistOrigin(event.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span="content">
              <AddSettingsButton
                disabled={!inputWhitelistOrigin}
                onClick={() => addWhitelistOrigin()}
              />
            </Grid.Col>
          </Grid>
          {selectedWhitelistOrigins.length > 0 && (
            <SimpleStringTable
              data={selectedWhitelistOrigins}
              onDelete={(origin) => deletedWhitelistOrigin(origin)}
            />
          )}
          <Divider my={32} />
          <Group justify="right">
            <Button
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
              disabled={selectedWhitelistOrigins.length === 0}
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
          loaderProps={{
            children: <PortalLoader message="Adding whitelist origins..." />,
          }}
        />
      )}
    </>
  )
}

export default WhitelistOriginsModal
