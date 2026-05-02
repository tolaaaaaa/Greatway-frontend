'use client'

import Modal from '../Modal'
import Button from '../Button'

type ConfirmVariant = 'danger' | 'warning' | 'info'
type DialogMode = 'confirm' | 'success'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: ConfirmVariant
  isLoading?: boolean
  mode?: DialogMode
  onContinue?: () => void
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Yes',
  cancelLabel = 'No',
  isLoading = false,
  mode = 'confirm',
  onContinue,
}: ConfirmDialogProps) {

  // Success mode - Continue button only
 if (mode === 'success') {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      className='p-10'
      footerClassName="border-none pt-0"
      bodyClassName="pb-0"
      overlayClassName='h-full'
      footer={
        <Button
          variant="primary"
          onClick={onContinue ?? onClose}
          className="w-full py-3 text-base font-bold font-cambay"
        >
          Continue
        </Button>
      }
    >
      <div className="flex flex-col items-center gap-3 text-center px-4 pt-6 pb-4 font-cambay">
        <h3 className="font-bold text-xl text-white leading-[144%]">
          {title}
        </h3>
        {description && (
          <p className="text-sm font-normal text-white leading-[144%]">
            {description}
          </p>
        )}
      </div>
    </Modal>
  )
}

// Confirm mode
return (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="md"
    showCloseButton={false}
    footerClassName="border-none pt-0"
    bodyClassName="pb-0"
    overlayClassName='h-full'
    footer={
      <div className="flex flex-col gap-4 w-full font-cambay">
        <Button
          variant="primary"
          onClick={onConfirm}
          isPending={isLoading}
          className="w-full py-5 text-base font-bold"
        >
          {confirmLabel}
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
          isDisabled={isLoading}
          className="w-full py-5 text-base font-bold border border-accent text-accent"
        >
          {cancelLabel}
        </Button>
      </div>
    }
  >
    <div className="flex flex-col items-center text-center px-4 pt-6 pb-4 font-cambay">
      <h3 className="font-bold text-xl text-white leading-[144%]">
        {title}
      </h3>
    </div>
  </Modal>
)
}