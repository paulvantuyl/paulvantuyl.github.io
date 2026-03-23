import { useState } from 'react'
import { Listbox } from '@headlessui/react'
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
  const [selected, setSelected] = useState(value || null)

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
          <Listbox.Button className="select-button">
            {displayLabel}
          </Listbox.Button>
          <Listbox.Options className="select-options">
            {options.map(option => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className="select-option"
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}

Select.displayName = 'Select'

export default Select
