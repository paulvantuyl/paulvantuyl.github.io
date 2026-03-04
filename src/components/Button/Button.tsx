import { forwardRef } from 'react';
import { Button as HeadlessButton } from '@headlessui/react';
import type { ButtonProps } from './Button.types';
import './Button.css';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <HeadlessButton
        ref={ref}
        className={className ? `button ${className}` : 'button'}
        {...props}
      >
        {children}
      </HeadlessButton>
    )
  }
)

Button.displayName = 'Button'

export default Button

