import { useEffect, useMemo, useState } from 'react'
import { Description, Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Icon } from '../Icon'
import type { SelectProps } from './Select.types'
import './Select.css'

const Select = ({
  options,
  value,
  onChange,
  label,
  labelHidden = false,
  description,
  placeholder = 'Select an option...',
  disabled = false,
  className = '',
  ...props
}: SelectProps) => {
  const selectedFromValue = useMemo(() => {
    if (value === undefined) return null
    return value
  }, [value])

  const [selected, setSelected] = useState<string | number | null>(selectedFromValue)

  useEffect(() => {
    setSelected(selectedFromValue)
  }, [selectedFromValue])

  const handleChange = (newValue: string | number | null) => {
    setSelected(newValue)
    onChange?.(newValue)
  }

  const selectedOption = options.find((opt) => opt.value === selected)
  const displayLabel = selectedOption?.label || placeholder

  return (
    <Field className={`select-container ${className}`} disabled={disabled} {...props}>
      {label && <Label className={`select-label${labelHidden ? ' select-label-hidden' : ''}`}>{label}</Label>}
      {description && <Description className="select-description">{description}</Description>}
      <Listbox value={selected} onChange={handleChange} disabled={disabled}>
        <div className="relative">
          <ListboxButton className="select-button">
            <span className="select-button-label">{displayLabel}</span>
            <span className="select-button-icon">
              <Icon name="chevron-down" className="button-icon" />
            </span>
          </ListboxButton>
          <ListboxOptions anchor="bottom" className="select-options w-(--button-width) --anchor-gap-2">
            {options.map((option) => (
              <ListboxOption key={String(option.value)} value={option.value} className="select-option">
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </Field>
  )
}

Select.displayName = 'Select'

export default Select
