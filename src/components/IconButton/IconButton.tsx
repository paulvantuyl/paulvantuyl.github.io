import { forwardRef, type Ref } from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { Icon } from '../Icon'
import type { IconButtonProps } from './IconButton.types'
import './IconButton.css'

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, type = 'button', className = '', ...props }, ref) => {
    return (
      <BaseButton
        ref={ref as Ref<HTMLElement>}
        type={type}
        className={className ? `icon-button ${className}` : 'icon-button'}
        aria-label={label}
        {...props}
      >
        <span className="sr-only">{label}</span>
        <Icon name={icon} className="icon-button-icon" />
      </BaseButton>
    )
  }
)

IconButton.displayName = 'IconButton'

export default IconButton

