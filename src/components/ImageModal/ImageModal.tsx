import { Dialog } from '@base-ui/react/dialog'
import { IconButton } from '../IconButton'
import type { ImageModalProps } from './ImageModal.types'
import './ImageModal.css'

export function ImageModal({ src, alt = '', open, onClose }: ImageModalProps) {
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onClose()
    }
  }

  return (
    <Dialog.Root open={open && Boolean(src)} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="image-modal-backdrop" />
        <Dialog.Popup className="image-modal-popup">
          <Dialog.Title className="sr-only">{alt || 'Image preview'}</Dialog.Title>
          <div className="image-modal-content">
            <Dialog.Close
              render={
                <IconButton
                  icon="times"
                  label="Close image"
                  className="image-modal-close"
                />
              }
            />
            {src ? (
              <img className="image-modal-image" src={src} alt={alt} />
            ) : null}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
