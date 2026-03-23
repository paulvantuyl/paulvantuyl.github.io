import type { HTMLAttributes } from 'react'

export interface ComboboxOption {
  value: string | number
  label: string
}

export interface ComboboxProps extends HTMLAttributes<HTMLDivElement> {
  options: ComboboxOption[]
  value?: string | number
  onChange?: (value: string | number) => void
  onInputChange?: (query: string) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  displayValue?: (option: ComboboxOption | null) => string
}
