import type { HTMLAttributes } from 'react'

export interface SelectOption {
  value: string | number
  label: string
}

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SelectOption[]
  value?: string | number | null
  onChange?: (value: string | number | null) => void
  label?: string
  labelHidden?: boolean
  description?: string
  placeholder?: string
  disabled?: boolean
}
