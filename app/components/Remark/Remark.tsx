import ReactMarkdown, { Options } from "react-markdown"
import rehypeMermaid from "rehype-mermaid"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export const Remark = (props: Options) => {
  return (
    <ReactMarkdown
      components={{
        a: (props: any) => (
          <a
            className="pokt-remark-a"
            target={props.href.includes("http") ? "_blank" : "_self"}
            {...props}
          >
            {props.children}
          </a>
        ),
        img: (props: any) => (
          <img alt="pokt-remark" className="pokt-remark-img" {...props} />
        ),
      }}
      rehypePlugins={[
        rehypeRaw,
        rehypeSlug,
        [rehypeMermaid, { strategy: "pre-mermaid" }],
      ]}
      remarkPlugins={[remarkGfm]}
    >
      {props.children}
    </ReactMarkdown>
  )
}

export default Remark
