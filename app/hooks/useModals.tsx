import { useMantineTheme } from "@mantine/core"
import { modals, useModals as useMantineModals } from "@mantine/modals"
import { ModalSettings, OpenConfirmModal } from "@mantine/modals/lib/context"
import { useRef } from "react"

const useModals = () => {
  const theme = useMantineTheme()
  const { modals: modalsOpen } = useMantineModals()
  const closeAllRef = useRef(() => modals.closeAll())

  const commonModalProps: ModalSettings = {
    centered: true,
    overlayProps: {
      color: theme.colorScheme === "dark" ? theme.colors.navy[9] : theme.colors.gray[2],
      opacity: 0.8,
      blur: 3,
    },
    padding: "md",
  }

  const openConfirmationModal = (modalProps: OpenConfirmModal) =>
    modals.openConfirmModal({
      ...commonModalProps,
      groupProps: { grow: true, mt: 32 },
      ...modalProps,
    })

  const openContentModal = (modalProps: ModalSettings) => {
    modals.open({
      ...commonModalProps,
      ...modalProps,
    })
  }

  const openFullScreenModal = (modalProps: ModalSettings) => {
    modals.open({
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
    closeAllModals: closeAllRef.current,
  }
}

export default useModals
