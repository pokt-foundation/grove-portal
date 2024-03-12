import { ModalProps, useMantineTheme } from "@mantine/core"
import {
  useModals as useMantineModals,
  openConfirmModal,
  openModal,
  closeAllModals,
} from "@mantine/modals"

type OpenModalProps = Parameters<typeof openModal>[0]
type OpenConfirmationModalProps = Parameters<typeof openConfirmModal>[0]

const useModals = () => {
  const theme = useMantineTheme()
  const { modals: modalsOpen } = useMantineModals()

  const commonModalProps: Partial<Omit<ModalProps, "opened">> = {
    centered: true,
    overlayProps: {
      color: theme.colors.navy[9],
      opacity: 0.8,
      blur: 3,
    },
    padding: "md",
  }

  const openConfirmationModal = (modalProps: OpenConfirmationModalProps) =>
    openConfirmModal({
      ...commonModalProps,
      groupProps: { grow: true, mt: 32 },
      ...modalProps,
    })

  const openContentModal = (modalProps: OpenModalProps) => {
    openModal({
      ...commonModalProps,
      ...modalProps,
    })
  }

  const openFullScreenModal = (modalProps: OpenModalProps) => {
    openModal({
      fullScreen: true,
      withCloseButton: false,
      styles: { body: { marginTop: "90px" } },
      ...commonModalProps,
      ...modalProps,
    })
  }

  return {
    openConfirmationModal,
    openContentModal,
    openFullScreenModal,
    modalsOpen,
    closeAllModals,
  }
}

export default useModals
