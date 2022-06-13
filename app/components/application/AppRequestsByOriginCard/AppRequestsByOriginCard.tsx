import styles from "./styles.css"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { useMemo } from "react"
import { UserLBOriginBucket } from "@pokt-foundation/portal-types"
import { useTranslate } from "~/context/TranslateContext"

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
            <a href={origin} target="_blank" rel="noreferrer">
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
        label={t.AppRequestsByOriginCard.label}
        data={tableData}
        columns={t.AppRequestsByOriginCard.columns}
        paginate
      />
    </div>
  )
}
