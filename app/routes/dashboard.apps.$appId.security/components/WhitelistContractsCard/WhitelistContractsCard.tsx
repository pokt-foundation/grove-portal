import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  IconPlus,
  Loader,
  Text,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import ChainsDropdown from "~/components/ChainsDropdown/ChainsDropdown"
import AppEndpointUrl from "~/components/application/AppEndpointUrl"
import { blockchains } from "~/models/portal/portal.data"
import { Blockchain, EndpointQuery } from "~/models/portal/sdk"
import { trackEvent, AmplitudeEvents } from "~/utils/analytics"
import { getImageForChain } from "~/utils/known-chains/known-chains"
import useSecurityState, {
  formatData,
  WhitelistContractType,
  FormatData,
} from "../../hooks/useSecurityState"
import { useTranslate } from "~/context/TranslateContext"
import { useNavigation } from "@remix-run/react"

interface WhitelistContractsCardProps {
  endpoint: EndpointQuery["endpoint"]
}
const WhitelistContractsCard = ({ endpoint }: WhitelistContractsCardProps) => {
  const navigation = useNavigation()
  const { t } = useTranslate()
  const theme = useMantineTheme()

  const [state, dispatch] = useSecurityState(endpoint, navigation.state)

  const {
    whitelistContracts,
    whitelistContractsDropdown,
    whitelistContractsInput,
    saveModalsShown: { isWhitelistContractsSaveShown },
  } = state

  const whitelistContractsDropdownChain =
    blockchains.find((chain) => chain?.id === whitelistContractsDropdown)?.description ||
    ""

  return (
    <Card mb="xl" p="xl">
      <div className="pokt-card-header">
        <h3>{t.security.headings.contracts}</h3>
        {isWhitelistContractsSaveShown ? (
          <Flex>
            <Button
              mr=".5em"
              px="2em"
              size="sm"
              variant="outline"
              onClick={() => {
                dispatch({
                  type: "SET_WHITELIST_CONTRACTS",
                  payload: formatData<WhitelistContractType>(
                    endpoint.gatewaySettings?.whitelistContracts,
                    "contracts",
                  ),
                })
                dispatch({
                  type: "SET_SAVE_MODAL_SHOWN",
                  payload: { modal: "isWhitelistContractsSaveShown", shown: false },
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
      <Text size="sm">{t.security.whitelistContractsText}</Text>
      <Flex align="center" gap="xs" mb="xs" w="100%">
        <ChainsDropdown
          chains={blockchains}
          onChange={(val: string) =>
            dispatch({ type: "SET_WHITELIST_CONTRACTS_DROPDOWN", payload: val })
          }
        />
        {whitelistContractsDropdownChain ? (
          <Badge
            fullWidth
            color="gray"
            leftSection={
              getImageForChain(whitelistContractsDropdownChain) ? (
                <img
                  alt={whitelistContractsDropdownChain}
                  height={16}
                  src={getImageForChain(whitelistContractsDropdownChain)}
                />
              ) : null
            }
            p="12px 0"
            sx={{
              borderRadius: "8px",
            }}
            variant="outline"
            w={100}
          >
            {whitelistContractsDropdownChain.substring(0, 3).toUpperCase()}
          </Badge>
        ) : null}
        <input
          className="grow userInputs"
          name="whitelistContractsInput"
          placeholder={t.security.contractPlaceholder}
          value={whitelistContractsInput}
          onChange={(e) => {
            dispatch({
              type: "SET_WHITELIST_CONTRACTS_INPUT",
              payload: e.target.value,
            })
          }}
        />
        {whitelistContractsInput !== "" && whitelistContractsDropdown !== "" ? (
          <Button
            aria-label={t.security.contractAria}
            size="xs"
            type="button"
            variant="outline"
            onClick={() => {
              dispatch({
                type: "SET_WHITELIST_CONTRACTS",
                payload: [
                  ...whitelistContracts,
                  {
                    id: whitelistContractsDropdown,
                    inputValue: whitelistContractsInput,
                  },
                ],
              })
              dispatch({ type: "SET_WHITELIST_CONTRACTS_INPUT", payload: "" })
              dispatch({
                type: "SET_SAVE_MODAL_SHOWN",
                payload: { modal: "isWhitelistContractsSaveShown", shown: true },
              })
            }}
          >
            <IconPlus height="18px" style={{ marginRight: "10px" }} width="18px" /> Add
          </Button>
        ) : null}
      </Flex>
      <div>
        {whitelistContracts.map((item) => {
          const blockchain: Blockchain | undefined | null = blockchains.find(
            (c) => c?.id === item.id,
          )
          return (
            <Box key={`${item.id} ${item.inputValue}`}>
              <AppEndpointUrl
                hasDelete
                readOnly
                chain={blockchain}
                handleRemove={() => {
                  const newArray = whitelistContracts.filter((obj: FormatData) =>
                    !obj["inputValue"].includes(item.inputValue) ? obj : null,
                  )
                  dispatch({ type: "SET_WHITELIST_CONTRACTS", payload: newArray })
                  dispatch({
                    type: "SET_SAVE_MODAL_SHOWN",
                    payload: { modal: "isWhitelistContractsSaveShown", shown: true },
                  })
                }}
                value={item.inputValue}
              />
              <input name="whitelistContractsChains" type="hidden" value={item.id} />
              <input
                name="whitelistContractsValues"
                type="hidden"
                value={item.inputValue}
              />
            </Box>
          )
        })}
      </div>
    </Card>
  )
}

export default WhitelistContractsCard
