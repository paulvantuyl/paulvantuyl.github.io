import { Combobox as HeadlessCombobox } from '@headlessui/react'
import { ComboboxInput, ComboboxOption, ComboboxOptions, ComboboxButton, Description, Field, Label } from '@headlessui/react'
import type { ComboboxOption as ComboboxOptionType, ComboboxProps } from './Combobox.types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import './Combobox.css'
import { Icon } from '../Icon'

const Combobox = ({
  options,
  value,
  onChange,
  onInputChange,
  label,
  description,
  placeholder = 'Search...',
  disabled = false,
  displayValue,
  className = '',
  ...props
}: ComboboxProps) => {
  const [query, setQuery] = useState('')

  const selectedFromValue = useMemo(() => {
    if (value === undefined) return null
    return options.find((opt) => opt.value === value) ?? null
  }, [options, value])

  const [selectedOption, setSelectedOption] = useState<ComboboxOptionType | null>(selectedFromValue)

  useEffect(() => {
    setSelectedOption(selectedFromValue)
  }, [selectedFromValue])

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))

  const handleChange = (newOption: ComboboxOptionType | null) => {
    setSelectedOption(newOption)
    onChange?.(newOption ? newOption.value : '')
    setQuery('')
  }

  const handleInputChange = (newQuery: string) => {
    setQuery(newQuery)
    onInputChange?.(newQuery)
  }

  const displayLabelFn = useCallback(
    (option: ComboboxOptionType | null) => {
      if (displayValue) return displayValue(option)
      return option?.label ?? ''
    },
    [displayValue]
  )

  return (
    <Field className={`combobox-container ${className}`} disabled={disabled} {...props}>
      {label && <Label className="combobox-label">{label}</Label>}
      {description && <Description className="combobox-description">{description}</Description>}
      <HeadlessCombobox value={selectedOption} onChange={handleChange} onClose={() => setQuery('')} disabled={disabled}>
        <div className="relative">
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <Icon name="chevron-down" className="button-icon" />
          </ComboboxButton>
          <ComboboxInput
            displayValue={displayLabelFn}
            className="combobox-input"
            placeholder={placeholder}
            onChange={(event) => handleInputChange(event.target.value)}
            disabled={disabled}
          />
        </div>
        <ComboboxOptions anchor="bottom" className="combobox-options w-(--input-width) --anchor-gap-2">
          {filteredOptions.length === 0 ? (
            <div className="combobox-empty">No results found</div>
          ) : (
            filteredOptions.map((option) => (
              <ComboboxOption key={String(option.value)} value={option} className="combobox-option">
                {option.label}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </HeadlessCombobox>
    </Field>
  )
}

Combobox.displayName = 'Combobox'

export default Combobox
