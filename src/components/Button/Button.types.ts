import type { ButtonHTMLAttributes } from 'react'
import type { IconDefinition } from '@paulvantuyl/pro-duotone-svg-icons'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  leadingIcon?: IconDefinition
  trailingIcon?: IconDefinition
}

