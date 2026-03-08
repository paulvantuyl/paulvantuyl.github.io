import { forwardRef } from 'react'
import { Button as HeadlessButton } from '@headlessui/react'
import type { ButtonProps } from './Button.types'
import { Icon } from '../Icon'
import './Button.css'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', leadingIcon, trailingIcon, ...props }, ref) => {
    return (
      <HeadlessButton
        ref={ref}
        className={className ? `button ${className}` : 'button'}
        {...props}
      >
        {leadingIcon && <Icon icon={leadingIcon} className="button-icon" />}
        {children}
        {trailingIcon && <Icon icon={trailingIcon} className="button-icon" />}
      </HeadlessButton>
    )
  }
)

Button.displayName = 'Button'

export default Button

