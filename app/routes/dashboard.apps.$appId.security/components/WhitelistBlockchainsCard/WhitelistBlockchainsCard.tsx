import {
  Button,
  Card,
  Flex,
  Loader,
  Text,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import React from "react"
import ChainsDropdown from "~/components/ChainsDropdown/ChainsDropdown"
import AppEndpointUrl from "~/components/application/AppEndpointUrl"
import { Blockchain, BlockchainsQuery, EndpointQuery } from "~/models/portal/sdk"
import { trackEvent, AmplitudeEvents } from "~/utils/analytics"
import useSecurityState from "../../hooks/useSecurityState"
import { useNavigation } from "@remix-run/react"
import { useTranslate } from "~/context/TranslateContext"

interface WhitelistBlockchainsCardProps {
  blockchains: BlockchainsQuery["blockchains"]
  endpoint: EndpointQuery["endpoint"]
}

const WhitelistBlockchainsCard = ({
  blockchains,
  endpoint,
}: WhitelistBlockchainsCardProps) => {
  const navigation = useNavigation()
  const { t } = useTranslate()
  const theme = useMantineTheme()

  const [state, dispatch] = useSecurityState(endpoint, navigation.state)

  const {
    whitelistBlockchains,
    saveModalsShown: { isApprovedChainsSaveShown },
  } = state

  const addIfMissingOrRemove = (item: string, arr: string[]) => {
    if (arr.indexOf(item) !== -1) {
      return arr.filter((i) => i !== item)
    }
    return [...arr, item]
  }

  return (
    <Card mb="xl" p="xl">
      <div className="pokt-card-header">
        <h3>{t.security.headings.approvedChains}</h3>
        {isApprovedChainsSaveShown ? (
          <Flex>
            <Button
              mr=".5em"
              px="2em"
              size="sm"
              variant="outline"
              onClick={() => {
                dispatch({
                  type: "SET_WHITELIST_BLOCKCHAINS",
                  payload: endpoint.gatewaySettings.whitelistBlockchains as string[],
                })
                dispatch({
                  type: "SET_SAVE_MODAL_SHOWN",
                  payload: { modal: "isApprovedChainsSaveShown", shown: false },
                })
              }}
            >
              {t.common.reset}
            </Button>
            <Button
              size="sm"
              sx={{
                padding: "0 2em",
              }}
              type="submit"
              variant="filled"
              onClick={() => {
                trackEvent(AmplitudeEvents.SecuritySettingsUpdate)
              }}
            >
              {t.common.save}
              {navigation.state !== "idle" && (
                <Loader color={theme.colors.blue[5]} ml={8} size="xs" />
              )}
            </Button>
          </Flex>
        ) : null}
      </div>
      <Flex justify="space-between">
        <Text size="sm">{t.security.approvedChainsText}</Text>
        <ChainsDropdown
          chains={blockchains}
          checkboxData={whitelistBlockchains}
          onChange={(val: string) => {
            dispatch({
              type: "SET_WHITELIST_BLOCKCHAINS",
              payload: addIfMissingOrRemove(val, whitelistBlockchains),
            })
            dispatch({
              type: "SET_SAVE_MODAL_SHOWN",
              payload: { modal: "isApprovedChainsSaveShown", shown: true },
            })
          }}
        />
      </Flex>

      {whitelistBlockchains.map((item: string) => {
        const blockchain: Blockchain | undefined | null = blockchains.find(
          (c) => c?.id === item,
        )
        return (
          <React.Fragment key={item}>
            <AppEndpointUrl
              key={item}
              readOnly
              chain={blockchain}
              handleRemove={() => {
                const newArray = state.whitelistBlockchains.filter(
                  (blockchain) => blockchain !== item,
                )
                dispatch({ type: "SET_WHITELIST_BLOCKCHAINS", payload: newArray })
                dispatch({
                  type: "SET_SAVE_MODAL_SHOWN",
                  payload: { modal: "isApprovedChainsSaveShown", shown: true },
                })
              }}
              hasDelete={true}
              value={blockchain?.description ?? ""}
            />
            <input name="whitelistBlockchains" type="hidden" value={item} />
          </React.Fragment>
        )
      })}
    </Card>
  )
}

export default WhitelistBlockchainsCard
