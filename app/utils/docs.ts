import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"
import { documentation } from "~/models/cms/sdk"

export const findChildren = (docId: string, docs: documentation[]): LinksGroupProps[] => {
  return docs
    .filter((doc) => doc.parent?.id === docId)
    .map((doc) => ({
      id: doc.id,
      label: doc.translations?.[0]?.title || "",
      link: `${doc.parent?.slug}/${doc.slug}` || "",
      slug: doc.slug || "",
      links: findChildren(doc.id, docs),
      hasParent: true,
    }))
}

export const organizeData = (docs: documentation[]): LinksGroupProps[] => {
  return docs
    .filter((doc) => !doc.parent)
    .map((doc) => ({
      id: doc.id,
      label: doc.translations?.[0]?.title || "",
      link: doc.slug || "",
      slug: doc.slug || "",
      links: findChildren(doc.id, docs),
      hasParent: false,
    }))
}

export function flattenTree(tree: LinksGroupProps[]): LinksGroupProps[] {
  return tree.flatMap(dfs)

  function dfs(node: LinksGroupProps): LinksGroupProps[] {
    return [node, ...node.links.flatMap(dfs)]
  }
}

export function nextNodeInTree(
  nodes: LinksGroupProps[],
  node: LinksGroupProps | undefined,
) {
  if (!node) return

  const next = nodes.findIndex((n) => n.id === node.id)
  if (next >= nodes.length - 1) return

  return nodes[next + 1]
}
