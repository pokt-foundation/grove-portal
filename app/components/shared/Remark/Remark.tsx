import { Anchor } from "@pokt-foundation/pocket-blocks"
import { Remark as ReactRemark, RemarkProps } from "react-remark"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export const Remark = (props: RemarkProps) => {
  return (
    <ReactRemark
      rehypeReactOptions={{
        components: {
          a: (props: any) => (
            <Anchor
              className="pokt-remark-a"
              target={props.href.includes("http") ? "_blank" : "_self"}
              {...props}
            >
              {props.children}
            </Anchor>
          ),
        },
      }}
    >
      {props.children}
    </ReactRemark>
  )
}

export default Remark
