import { type LinksFunction } from "@remix-run/node"
import ReactMarkdown, { Options } from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import styles from "./styles.css"

/* c8 ignore start */
export const links: LinksFunction = () => {
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
          <img
            alt="pokt-remark"
            className="pokt-remark-img"
            style={{ width: "100%" }}
            {...props}
          />
        ),
      }}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
    >
      {props.children}
    </ReactMarkdown>
  )
}

export default Remark
