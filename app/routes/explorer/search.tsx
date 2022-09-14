import type { LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"

type SearchType = "transactions" | "blocks" | "addresses"

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const query = url.searchParams.get("query")
  let type: SearchType | undefined

  if (query) {
    if (!isNaN(Number(query))) {
      type = "blocks"
    } else if (query.length > 40) {
      type = "transactions"
    } else {
      type = "addresses"
    }

    return redirect(`/explorer/${type}/${query}`)
  }

  const params = new URLSearchParams({
    error: "Query cannot be blank",
  })
  return redirect(`/explorer?${params.toString()}`)
}
