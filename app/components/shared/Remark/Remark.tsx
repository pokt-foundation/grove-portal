import ReactMarkdown, { Options } from "react-markdown"
// import { Remark as ReactRemark, RemarkProps } from "react-remark"
import rehypeRaw from 'rehype-raw'
import remarkGfm from "remark-gfm"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export const Remark = (props: Options) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {props.children}
    </ReactMarkdown>
    // <ReactRemark
    //   rehypeReactOptions={{
    //     components: {
    //       a: (props: any) => (
    //         <a
    //           className="pokt-remark-a"
    //           target={props.href.includes("http") ? "_blank" : "_self"}
    //           {...props}
    //         >
    //           {props.children}
    //         </a>
    //       ),
    //       img: (props: any) => <img className="pokt-remark-img" {...props} />,
    //     },
    //   }}
    //   //@ts-ignore
    //   remarkPlugins={[remarkGfm]}
    // >
    //   {props.children}
    // </ReactRemark>
  )
}

export default Remark
