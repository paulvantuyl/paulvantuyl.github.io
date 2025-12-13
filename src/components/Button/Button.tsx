import { forwardRef } from 'react'
import type { ButtonProps } from './Button.types'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`rounded-none px-4 py-2 bg-blue hover:bg-dark-blue font-bold ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button

