import { Button, Divider, Group, Text, useMantineTheme } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { useSearchParams } from "@remix-run/react"
import React, { useMemo, useState } from "react"
import { useHydrated } from "remix-utils/use-hydrated"
import FluidSelect from "~/components/FluidSelect"
import { PortalApp } from "~/models/portal/sdk"
import { DEFAULT_APPMOJI } from "~/routes/account_.$accountId.create/components/AppmojiPicker"
import { dayjs } from "~/utils/dayjs"

type LogsControlsProps = {
  apps?: PortalApp[]
}

const logTypeSelectItem = [
  { value: "all", label: "All Relays" },
  { value: "success", label: "Successful Relays" },
  { value: "errors", label: "Errors" },
]

const LogsControls = ({ apps }: LogsControlsProps) => {
  const theme = useMantineTheme()
  const isHydrated = useHydrated()

  const appsSelect = useMemo(
    () => [
      ...(apps && apps.length > 0
        ? apps.map((app) => ({
            value: app?.id ?? "",
            label: `${String.fromCodePoint(
              parseInt(app?.appEmoji ? app.appEmoji : DEFAULT_APPMOJI, 16),
            )} ${app?.name}`,
          }))
        : []),
    ],
    [apps],
  )

  const [searchParams, setSearchParams] = useSearchParams()
  const appParam = searchParams.get("app")
    ? (searchParams.get("app") as string)
    : apps && apps?.length > 0
    ? apps[0].id
    : ""

  const logTypeParam = searchParams.get("type") ?? "all"
  const tsParam = searchParams.get("ts")

  const minDate = dayjs().subtract(1, "day").toDate()

  const [ts, setTs] = useState(tsParam ? new Date(tsParam) : new Date())

  const handleDateRangeChange = () => {
    if (!dayjs(ts).isAfter(new Date()) && dayjs(ts).isAfter(minDate)) {
      setSearchParams((searchParams) => {
        searchParams.set("ts", ts.toISOString())
        return searchParams
      })
    }
  }

  const showLatestLogs = () => {
    setTs(new Date())
    setSearchParams((searchParams) => {
      searchParams.delete("ts")
      searchParams.delete("page")
      return searchParams
    })
  }

  return (
    <Group justify="space-between">
      <Group>
        <Group
          gap={0}
          pos="relative"
          style={{
            border: `1px solid ${theme.colors.gray[8]}`,
            borderRadius: 4,
          }}
        >
          {apps && apps?.length > 0 ? (
            <>
              <FluidSelect
                items={appsSelect}
                styles={{ label: { marginLeft: 12, marginRight: 12 } }}
                value={appParam}
                onSelect={(app) =>
                  setSearchParams((searchParams) => {
                    searchParams.set("app", app)
                    return searchParams
                  })
                }
              />
              <Divider orientation="vertical" />
            </>
          ) : null}

          <FluidSelect
            items={logTypeSelectItem}
            styles={{ label: { marginLeft: 12, marginRight: 12 } }}
            value={logTypeParam}
            onSelect={(logType) =>
              setSearchParams((searchParams) => {
                searchParams.set("type", logType)
                return searchParams
              })
            }
          />
        </Group>
        <Text>starting from</Text>
        <DateTimePicker
          withSeconds
          aria-label="Pick date and time"
          maxDate={new Date()}
          minDate={minDate}
          placeholder="Pick date and time"
          popoverProps={{
            onClose: handleDateRangeChange,
          }}
          styles={{
            input: {
              padding: "8px 14px",
            },
          }}
          value={isHydrated ? ts : undefined}
          valueFormat="D MMMM YYYY, H:mm:ss"
          onChange={(value) => {
            if (value) {
              setTs(value)
            }
          }}
        />
      </Group>
      <Button color="gray" px={14} radius={4} variant="outline" onClick={showLatestLogs}>
        Show Latest
      </Button>
    </Group>
  )
}

export default LogsControls
