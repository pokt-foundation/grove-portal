import { LinksGroupProps } from "~/components/LinksGroup/LinksGroup"
import { documentation } from "~/models/cms/sdk"

export const findChildren = (
  docId: string,
  docs: documentation[],
  parentSlug: string = "",
): LinksGroupProps[] => {
  return docs
    .filter((doc) => doc.parent?.id === docId)
    .map((doc) => {
      const slugPath = `${parentSlug}/${doc.slug}`
      return {
        id: doc.id,
        label: doc.translations?.[0]?.title || "",
        link: slugPath || "",
        slug: doc.slug || "",
        links: findChildren(doc.id, docs, slugPath),
        hasParent: true,
      }
    })
}

export const organizeData = (docs: documentation[]): LinksGroupProps[] => {
  return docs
    .filter((doc) => !doc.parent)
    .map((doc) => ({
      id: doc.id,
      label: doc.translations?.[0]?.title || "",
      link: doc.slug || "",
      slug: doc.slug || "",
      links: findChildren(doc.id, docs, doc.slug!),
      hasParent: false,
    }))
}

export function flattenTree(tree: LinksGroupProps[]): LinksGroupProps[] {
  return tree.flatMap(dfs)

  function dfs(node: LinksGroupProps): LinksGroupProps[] {
    return [node, ...node.links.flatMap(dfs)]
  }
}

export function getNextAndPrevNodesInTree(
  nodes: LinksGroupProps[],
  node: LinksGroupProps | undefined,
) {
  if (!node || !nodes.length) return [null, null]

  const currentNodeIdx = nodes.findIndex((n) => n.id === node.id)

  if (currentNodeIdx === -1) {
    console.warn("Node not found in the array")
    return [null, null]
  }

  let prevNode, nextNode;
  
  // Ensure previous node isn't a parent
  for(let i = currentNodeIdx - 1; i >= 0; i--) {
    if (!nodes[i].links || nodes[i].links.length === 0) {
      prevNode = nodes[i];
      break;
    }
  }

  // Ensure next node isn't a parent
  for(let i = currentNodeIdx + 1; i < nodes.length; i++) {
    if (!nodes[i].links || nodes[i].links.length === 0) {
      nextNode = nodes[i];
      break;
    }
  }
  
  return [prevNode || null, nextNode || null]
}
