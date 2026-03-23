import { useState } from 'react'
import { Combobox as HeadlessCombobox } from '@headlessui/react'
import type { ComboboxProps } from './Combobox.types'
import './Combobox.css'

const Combobox = ({
  options,
  value,
  onChange,
  onInputChange,
  label,
  placeholder = 'Search...',
  disabled = false,
  displayValue,
  className = '',
  ...props
}: ComboboxProps) => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(value || null)

  const filteredOptions =
    query === ''
      ? options
      : options.filter(option =>
          option.label.toLowerCase().includes(query.toLowerCase())
        )

  const selectedOption = options.find(opt => opt.value === selected)

  const handleChange = (newValue: string | number) => {
    setSelected(newValue)
    onChange?.(newValue)
    setQuery('')
  }

  const handleInputChange = (newQuery: string) => {
    setQuery(newQuery)
    onInputChange?.(newQuery)
  }

  const displayLabel =
    displayValue && selectedOption ? displayValue(selectedOption) : selectedOption?.label || ''

  return (
    <div className={`combobox-container ${className}`} {...props}>
      {label && <label className="combobox-label">{label}</label>}
      <HeadlessCombobox value={selected} onChange={handleChange} disabled={disabled}>
        <div className="combobox-wrapper">
          <HeadlessCombobox.Input
            className="combobox-input"
            placeholder={placeholder}
            displayValue={() => displayLabel}
            onChange={e => handleInputChange(e.target.value)}
          />
          <HeadlessCombobox.Options className="combobox-options">
            {filteredOptions.length === 0 ? (
              <div className="combobox-empty">No results found</div>
            ) : (
              filteredOptions.map(option => (
                <HeadlessCombobox.Option
                  key={option.value}
                  value={option.value}
                  className="combobox-option"
                >
                  {option.label}
                </HeadlessCombobox.Option>
              ))
            )}
          </HeadlessCombobox.Options>
        </div>
      </HeadlessCombobox>
    </div>
  )
}

Combobox.displayName = 'Combobox'

export default Combobox
