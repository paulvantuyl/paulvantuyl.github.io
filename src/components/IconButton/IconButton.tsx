import { forwardRef } from 'react'
import { Button as HeadlessButton } from '@headlessui/react'
import { Icon } from '../Icon'
import type { IconButtonProps } from './IconButton.types'
import './IconButton.css'

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, type = 'button', className = '', ...props }, ref) => {
    return (
      <HeadlessButton
        ref={ref}
        type={type}
        className={className ? `icon-button ${className}` : 'icon-button'}
        aria-label={label}
        {...props}
      >
        <span className="sr-only">{label}</span>
        <Icon icon={icon} className="icon-button-icon" />
      </HeadlessButton>
    )
  }
)

IconButton.displayName = 'IconButton'

export default IconButton

