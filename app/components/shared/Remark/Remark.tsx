import { Link } from "@remix-run/react"
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
            <Link className="pokt-remark-a" to={props.href}>
              {props.children}
            </Link>
          ),
        },
      }}
    >
      {props.children}
    </ReactRemark>
  )
}

export default Remark
