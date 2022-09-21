import { AspectRatio } from "@mantine/core"
import { Box, Button, Group, Title, Text } from "@pokt-foundation/pocket-blocks"
import { ActionFunction, json, LinksFunction, LoaderFunction } from "@remix-run/node"
import { Form, useLoaderData, useSearchParams } from "@remix-run/react"
import { useMemo } from "react"
import invariant from "tiny-invariant"
import Card, { links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { initCmsClient } from "~/models/cms/cms.server"
import { ecosystem_filter, getEcosystemQuery, InputMaybe } from "~/models/cms/sdk"

export const links: LinksFunction = () => {
  return [...CardLinks(), ...TextInputLinks()]
}

type LoaderData = {
  eco: getEcosystemQuery
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const tagId = url.searchParams.get("tag")
  const query = url.searchParams.get("query")

  let search = undefined
  let filter: InputMaybe<ecosystem_filter> = { status: { _eq: "published" } }
  if (tagId) {
    filter.tags = { id: { _eq: tagId } }
  }

  if (query) {
    search = query
  }

  const cms = initCmsClient()
  const eco = await cms.getEcosystem({
    filter,
    search,
    language: "en-US",
  })

  return json<LoaderData>({
    eco,
  })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const id = formData.get("id")
  const votes = formData.get("votes")

  invariant(id && typeof id === "string", "tag id must be sent")
  invariant(votes && typeof votes === "string", "votes must be sent")

  const cms = initCmsClient()
  await cms.updateEcosystem({
    id,
    data: {
      id,
      votes: Number(votes),
    },
  })

  return json({
    error: false,
  })
}

export default function TermsAndConditions() {
  const { eco } = useLoaderData<LoaderData>()
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTagId = useMemo(() => {
    return searchParams.get("tag")
  }, [searchParams])

  const selectedTag = useMemo(() => {
    if (selectedTagId) {
      return eco.tags.find((t) => t.id === selectedTagId)
    }
  }, [selectedTagId, eco.tags])

  const handleClearParams = () => {
    setSearchParams({})
  }

  return (
    <>
      <section>
        <h1>Ecosystem</h1>
        <Form>
          <Box mb={32}>
            <Group>
              <Button
                variant={selectedTagId ? "outline" : "filled"}
                onClick={handleClearParams}
              >
                All
              </Button>
              {eco.tags &&
                eco.tags.map((tag) => (
                  <Button
                    key={tag.id}
                    name="tag"
                    type="submit"
                    value={tag.id}
                    variant={selectedTagId === tag.id ? "filled" : "outline"}
                  >
                    {tag.translations![0]?.display}
                  </Button>
                ))}
            </Group>
          </Box>
          <Box mb={32}>
            <Group>
              <input defaultValue={undefined} name="query" />
              <Button type="submit" variant="outline">
                Search
              </Button>
            </Group>
          </Box>
        </Form>
      </section>
      <section>
        {eco.ecosystem.length > 0 ? (
          eco.ecosystem.map((item) => (
            <Card key={item.id}>
              <Group position="apart">
                <Group>
                  {item.thumbnail && (
                    <Box sx={{ border: "1px solid white", borderRadius: 4, padding: 8 }}>
                      <AspectRatio ratio={1 / 1} sx={{ width: 48 }}>
                        <img
                          alt={`${item.thumbnail.title}`}
                          src={`https://r6lvnanh.directus.app/assets/${item.thumbnail.filename_disk}`}
                          style={{ objectFit: "contain" }}
                        />
                      </AspectRatio>
                    </Box>
                  )}
                  <div>
                    <Title mb={8} order={3}>
                      {item.name}
                    </Title>
                    <Group>
                      {item.website && (
                        <a href={item.website} rel="noreferrer" target="_blank">
                          <Text size="xs">{item.website}</Text>
                        </a>
                      )}
                      {item.discord && (
                        <a href={item.discord} rel="noreferrer" target="_blank">
                          <Text size="xs">{item.discord}</Text>
                        </a>
                      )}
                    </Group>
                  </div>
                </Group>
                <Form method="post">
                  <input name="id" type="hidden" value={item.id} />
                  <Button name="votes" type="submit" value={(item.votes ?? 0) + 1}>
                    <Text size="sm">{item.votes ?? 0} Votes</Text>
                  </Button>
                </Form>
              </Group>
            </Card>
          ))
        ) : (
          <Card>
            No current items found in "{selectedTag?.translations![0]?.display}"
          </Card>
        )}
      </section>
    </>
  )
}
