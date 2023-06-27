import {
  Button,
  Card,
  Flex,
  IconPlus,
  Loader,
  TextInput,
  Text,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import CopyText from "~/components/CopyText"
import Delete from "~/components/Delete/Delete"
import { EndpointQuery } from "~/models/portal/sdk"
import { trackEvent, AmplitudeEvents } from "~/utils/analytics"
import { addIfMissing } from "../../utils/utils"
import { useNavigation } from "@remix-run/react"
import { useTranslate } from "~/context/TranslateContext"
import useSecurityState from "../../hooks/useSecurityState"

interface WhitelistOriginsCardProps {
  endpoint: EndpointQuery["endpoint"]
}

const WhitelistOriginsCard = ({ endpoint }: WhitelistOriginsCardProps) => {
  const navigation = useNavigation()
  const { t } = useTranslate()
  const theme = useMantineTheme()

  const [state, dispatch] = useSecurityState(endpoint, navigation.state)

  const {
    whitelistOrigins,
    whitelistOriginsInput,
    saveModalsShown: { isWhitelistOriginsSaveShown },
  } = state

  return (
    <Card mb="xl">
      <div className="pokt-card-header">
        <h3>{t.security.headings.origins}</h3>
        {isWhitelistOriginsSaveShown ? (
          <Flex>
            <Button
              mr=".5em"
              px="2em"
              size="sm"
              variant="outline"
              onClick={() => {
                dispatch({
                  type: "SET_WHITELIST_ORIGINS",
                  payload: endpoint.gatewaySettings.whitelistOrigins as string[],
                })
                dispatch({
                  type: "SET_SAVE_MODAL_SHOWN",
                  payload: { modal: "isWhitelistOriginsSaveShown", shown: false },
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
      <Text size="sm">{t.security.whitelistOriginsText}</Text>
      <div className="flexGrowRow">
        <TextInput
          id="userOrigins"
          placeholder={t.security.OriginPlaceholder}
          value={whitelistOriginsInput}
          onChange={(e) => {
            dispatch({ type: "SET_WHITELIST_ORIGINS_INPUT", payload: e.target.value })
          }}
        />
        {whitelistOriginsInput !== "" ? (
          <Button
            aria-label={t.security.OriginAria}
            size="xs"
            type="button"
            variant="outline"
            onClick={() => {
              dispatch({
                type: "SET_WHITELIST_ORIGINS",
                payload: addIfMissing(whitelistOriginsInput, whitelistOrigins),
              })
              dispatch({ type: "SET_WHITELIST_ORIGINS_INPUT", payload: "" })
              dispatch({
                type: "SET_SAVE_MODAL_SHOWN",
                payload: { modal: "isWhitelistOriginsSaveShown", shown: true },
              })
            }}
          >
            <IconPlus height="18px" style={{ marginRight: "10px" }} width="18px" /> Add
          </Button>
        ) : null}
      </div>
      <div>
        {whitelistOrigins.map((item: string) => (
          <div key={item} className="list">
            <TextInput readOnly value={item} />
            <CopyText text={String(item)} />
            <Delete
              onDelete={() => {
                const newArray = whitelistOrigins.filter((i) => i !== item)
                dispatch({ type: "SET_WHITELIST_ORIGINS", payload: newArray })
                dispatch({
                  type: "SET_SAVE_MODAL_SHOWN",
                  payload: { modal: "isWhitelistOriginsSaveShown", shown: true },
                })
              }}
            />
            <input name="whitelistOrigins" type="hidden" value={item} />
          </div>
        ))}
      </div>
    </Card>
  )
}

export default WhitelistOriginsCard
