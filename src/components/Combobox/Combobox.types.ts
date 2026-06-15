import type { HTMLAttributes } from 'react'

export interface ComboboxOption {
  value: string | number
  label: string
}

export interface ComboboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: ComboboxOption[]
  value?: string | number | null
  onChange?: (value: string | number | null) => void
  onInputChange?: (query: string) => void
  label?: string
  labelHidden?: boolean
  stretch?: boolean
  description?: string
  placeholder?: string
  disabled?: boolean
  displayValue?: (option: ComboboxOption | null) => string
}
