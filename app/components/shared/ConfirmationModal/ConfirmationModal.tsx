import { Button, Text } from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import { Dispatch, ReactNode, SetStateAction } from "react"
import CloseIcon from "../Icons/CloseIcon"
import ErrorIcon from "../Icons/ErrorIcon"
import InfoIcon from "../Icons/InfoIcon"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export interface ConfirmationModalPropsType {
  type: "options" | "error"
  isActive: boolean
}

type ConfirmationModalProps = {
  confirmationModalProps: ConfirmationModalPropsType
  setConfirmationModalProps: Dispatch<SetStateAction<ConfirmationModalPropsType>>
  children: React.ReactChild
}

const ConfirmationModal = ({
  confirmationModalProps: { type, isActive },
  setConfirmationModalProps,
  children,
}: ConfirmationModalProps) => {
  return (
    <>
      <div
        className={clsx({
          "confirmation-modal": true,
          active: isActive,
          [type]: true,
        })}
      >
        <span
          className="close"
          onClick={() =>
            setConfirmationModalProps((previousState: ConfirmationModalPropsType) => ({
              ...previousState,
              isActive: false,
            }))
          }
        >
          <CloseIcon />
        </span>
        {children}
      </div>
      <div
        className={clsx({
          "confirmation-modal-blur": true,
          active: isActive,
        })}
      ></div>
    </>
  )
}

export default ConfirmationModal
