import {
  Group,
  Tooltip,
  Table as PoktTable,
  IconClock,
} from "@pokt-foundation/pocket-blocks"
import { useMemo } from "react"
import styles from "./styles.css"
import Card, { links as CardLinks } from "~/components/Card"
import CopyTextIcon, {
  links as CopyTextIconLinks,
} from "~/components/CopyTextIcon"
import Table, { links as TableLinks } from "~/components/Table"
import { useTranslate } from "~/context/TranslateContext"
import { ErrorMetric } from "~/models/errormetrics/errormetrics.server"

/* c8 ignore start */
export const links = () => {
  return [
    ...TableLinks(),
    ...CopyTextIconLinks(),
    ...CardLinks(),
    { rel: "stylesheet", href: styles },
  ]
}
/* c8 ignore stop */

interface RequestsErrorsCardProps {
  errorMetrics: ErrorMetric[] | null
}

export default function AppRequestsErrorsCard({ errorMetrics }: RequestsErrorsCardProps) {
  const { t } = useTranslate()
  const tableData = useMemo(() => {
    if (!errorMetrics) {
      return null
    }
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
      {tableData ? (
        <Card>
          <Table
            search
            columns={t.AppRequestsErrorsCard.columns}
            data={tableData}
            label={t.AppRequestsErrorsCard.label}
            paginate={{
              perPage: 5,
            }}
          />
        </Card>
      ) : (
        <div className="pokt-table pokt-table-empty">
          <Card>
            <div className="pokt-card-header">
              <h3>{t.AppRequestsErrorsCard.label}</h3>
            </div>
            <div className="pokt-table-overflow">
              <PoktTable>
                <thead>
                  <tr>
                    {t.AppRequestsErrorsCard.columns.map((key) => (
                      <th key={key as string}>{key}</th>
                    ))}
                  </tr>
                </thead>
              </PoktTable>
              <p>Your application does not have relay data yet.</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
