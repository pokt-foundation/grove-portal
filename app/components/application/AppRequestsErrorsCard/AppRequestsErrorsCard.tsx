import { IconClock } from "@pokt-foundation/ui"
import { useMemo } from "react"
import styles from "./styles.css"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { EndpointRpcError } from "~/models/portal.server"
import Tooltip from "~/components/shared/Tooltip"
import CopyTextIcon, {
  links as CopyTextIconLinks,
} from "~/components/shared/CopyTextIcon"
import Group from "~/components/shared/Group"
import { useTranslate } from "~/context/TranslateContext"

export const links = () => {
  return [...TableLinks(), ...CopyTextIconLinks(), { rel: "stylesheet", href: styles }]
}

interface RequestsErrorsCardProps {
  errorMetrics: EndpointRpcError[]
}

export default function AppRequestsErrorsCard({ errorMetrics }: RequestsErrorsCardProps) {
  const { t } = useTranslate()
  const tableData = useMemo(() => {
    return errorMetrics
      .map((error, index) => {
        const date = new Date(error.timestamp)
        return {
          id: `${error.timestamp}-${error.nodepublickey}-${error.bytes}-${index}`,
          method: error.method,
          message: {
            value: error?.message ? error.message : "null",
            element: (
              <Group>
                <p className="pokt-table-ellipsis">
                  {error?.message ? error.message : "null"}
                </p>
                <CopyTextIcon text={error?.message ? error.message : "null"} />
              </Group>
            ),
          },
          address: {
            value: error.nodepublickey,
            element: (
              <Group>
                <p className="pokt-table-ellipsis">{error.nodepublickey}</p>
                <CopyTextIcon text={error.nodepublickey} />
              </Group>
            ),
          },
          size: `${error.bytes}B`,
          timestamp: {
            value: `${date.toDateString()} ${date.toTimeString()}`,
            element: (
              <Tooltip
                withArrow
                label={`${date.toDateString()} ${date.toTimeString()}`}
                transition="fade"
                transitionDuration={200}
              >
                <div>
                  <IconClock />
                </div>
              </Tooltip>
            ),
          },
        }
      })
      .filter((error) => !error.method.includes("check"))
  }, [errorMetrics])

  return (
    <div className="pokt-app-requests-by-origin">
      <Table
        search
        columns={t.AppRequestsErrorsCard.columns}
        data={tableData}
        label={t.AppRequestsErrorsCard.label}
        paginate={{
          perPage: 10,
        }}
      />
    </div>
  )
}
