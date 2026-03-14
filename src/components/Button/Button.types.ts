import type { ButtonHTMLAttributes } from 'react'
import type { IconName } from '../Icon/Icon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  leadingIcon?: IconName
  trailingIcon?: IconName
}

