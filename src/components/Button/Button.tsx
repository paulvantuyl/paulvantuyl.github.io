import { forwardRef } from 'react'
import type { ButtonProps } from './Button.types'
import './Button.css'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={className ? `button ${className}` : 'button'}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button

