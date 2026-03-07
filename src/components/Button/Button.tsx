import { forwardRef } from 'react';
import { Button as HeadlessButton } from '@headlessui/react';
import type { ButtonProps } from './Button.types';
import { ButtonIcon } from './ButtonIcon';
import './Button.css';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', leadingIcon, trailingIcon, ...props }, ref) => {
    return (
      <HeadlessButton
        ref={ref}
        className={className ? `button ${className}` : 'button'}
        {...props}
      >
        {leadingIcon && <ButtonIcon icon={leadingIcon} className="button-icon" />}
        {children}
        {trailingIcon && <ButtonIcon icon={trailingIcon} className="button-icon" />}
      </HeadlessButton>
    )
  }
)

Button.displayName = 'Button'

export default Button

