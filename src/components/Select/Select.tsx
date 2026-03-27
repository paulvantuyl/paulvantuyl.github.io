import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Icon } from '../Icon'
import type { SelectProps } from './Select.types'
import './Select.css'

const Select = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option...',
  disabled = false,
  className = '',
  ...props
}: SelectProps) => {
  const [selected, setSelected] = useState(value)

  const handleChange = (newValue: string | number) => {
    setSelected(newValue)
    onChange?.(newValue)
  }

  const selectedOption = options.find(opt => opt.value === selected)
  const displayLabel = selectedOption?.label || placeholder

  return (
    <div className={`select-container ${className}`} {...props}>
      {label && <label className="select-label">{label}</label>}
      <Listbox value={selected} onChange={handleChange} disabled={disabled}>
        <div className="select-wrapper">
          <ListboxButton className="select-button">
            {displayLabel}
            <Icon name="chevron-down" className="button-icon" />
          </ListboxButton>
          <ListboxOptions className="select-options">
            {options.map(option => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className="select-option"
              >
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  )
}

Select.displayName = 'Select'

export default Select
