import { openConfirmModal, openModal } from "@mantine/modals"
import { ModalSettings, OpenConfirmModal } from "@mantine/modals/lib/context"
import { useMantineTheme } from "@pokt-foundation/pocket-blocks"

const useModals = () => {
  const theme = useMantineTheme()

  const commonModalProps: ModalSettings = {
    centered: true,
    overlayColor:
      theme.colorScheme === "dark" ? theme.colors.navy[9] : theme.colors.gray[2],
    overlayOpacity: 0.8,
    overlayBlur: 3,
    padding: "md",
  }

  const openConfirmationModal = (modalProps: OpenConfirmModal) =>
    openConfirmModal({
      ...commonModalProps,
      groupProps: { grow: true, mt: 32 },
      ...modalProps,
    })

  const openContentModal = (modalProps: ModalSettings) => {
    openModal({
      ...commonModalProps,
      ...modalProps,
    })
  }

  const openFullScreenModal = (modalProps: ModalSettings) => {
    openModal({
      fullScreen: true,
      withCloseButton: false,
      ...commonModalProps,
      ...modalProps,
    })
  }

  return { openConfirmationModal, openContentModal, openFullScreenModal }
}

export default useModals
