import { UserLBOriginBucket } from "@pokt-foundation/portal-types"
import { useMemo } from "react"
import styles from "./styles.css"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { useTranslate } from "~/context/TranslateContext"

/* c8 ignore next */
export const links = () => {
  return [...TableLinks(), { rel: "stylesheet", href: styles }]
}

interface RequestsByOriginCardProps {
  usagePerOrigin: UserLBOriginBucket[]
  totalRelays: number
}

export default function AppRequestsByOriginCard({
  usagePerOrigin,
  totalRelays,
}: RequestsByOriginCardProps) {
  const { t } = useTranslate()

  const tableData = useMemo(() => {
    return usagePerOrigin
      .map(({ origin, count }) => ({
        id: origin,
        percentage: `${Number(count / totalRelays).toFixed(3)}%`,
        origin: {
          value: origin,
          element: (
            <a href={origin} rel="noreferrer" target="_blank">
              {origin}
            </a>
          ),
        },
        count: count,
      }))
      .sort((a, b) => b.count - a.count)
  }, [usagePerOrigin, totalRelays])

  return (
    <div className="pokt-app-requests-by-origin">
      <Table
        paginate
        columns={t.AppRequestsByOriginCard.columns}
        data={tableData}
        label={t.AppRequestsByOriginCard.label}
      />
    </div>
  )
}
