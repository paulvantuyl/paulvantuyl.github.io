import type { HTMLAttributes } from 'react'

export interface SelectOption {
  value: string | number
  label: string
}

export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  options: SelectOption[]
  value?: string | number
  onChange?: (value: string | number) => void
  label?: string
  placeholder?: string
  disabled?: boolean
}
