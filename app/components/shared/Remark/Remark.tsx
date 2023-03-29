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
              className="pokt-remark-img"
              {...props}
            />
          ),
        },
      }}
    >
      {props.children}
    </ReactRemark>
  )
}

export default Remark
