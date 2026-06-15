import { forwardRef, type Ref } from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import type { ButtonProps } from './Button.types'
import { Icon } from '../Icon'
import './Button.css'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', leadingIcon, trailingIcon, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref as Ref<HTMLElement>}
        className={className ? `button ${className}` : 'button'}
        {...props}
      >
        {leadingIcon && <Icon name={leadingIcon} className="button-icon" />}
        {children}
        {trailingIcon && <Icon name={trailingIcon} className="button-icon" />}
      </BaseButton>
    )
  }
)

Button.displayName = 'Button'

export default Button

