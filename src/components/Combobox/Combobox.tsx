import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { Field } from '@base-ui/react/field'
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
  labelHidden = false,
  description,
  placeholder = 'Search...',
  disabled = false,
  stretch = false,
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

  const handleValueChange = (newOption: ComboboxOptionType | null) => {
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
    <Field.Root className={`combobox-container${stretch ? ' grow' : ''} ${className}`} disabled={disabled} {...props}>
      {label && (
        <Field.Label
          nativeLabel={false}
          className={`combobox-label${labelHidden ? ' combobox-label-hidden' : ''}`}
        >
          {label}
        </Field.Label>
      )}
      {description && <Field.Description className="combobox-description">{description}</Field.Description>}
      <BaseCombobox.Root
        value={selectedOption}
        defaultOpen={false}
        onValueChange={handleValueChange}
        onOpenChange={(open) => {
          if (!open) {
            setQuery('')
          }
        }}
        onInputValueChange={handleInputChange}
        itemToStringLabel={displayLabelFn}
        disabled={disabled}
      >
        <div className="relative">
          <BaseCombobox.InputGroup className="combobox-wrapper">
            <BaseCombobox.Input className="combobox-input" placeholder={placeholder} disabled={disabled} />
            <BaseCombobox.Trigger className="group absolute inset-y-0 right-0 px-2.5" disabled={disabled}>
              <Icon name="chevron-down" className="button-icon" />
            </BaseCombobox.Trigger>
          </BaseCombobox.InputGroup>
        </div>
        <BaseCombobox.Portal>
          <BaseCombobox.Positioner
            side="bottom"
            align="start"
            sideOffset={8}
            className="combobox-options-positioner"
          >
            <BaseCombobox.Popup className="combobox-options">
              <BaseCombobox.List>
                {filteredOptions.length === 0 ? (
                  <div className="combobox-empty">No results found</div>
                ) : (
                  filteredOptions.map((option) => (
                    <BaseCombobox.Item key={String(option.value)} value={option} className="combobox-option">
                      {option.label}
                    </BaseCombobox.Item>
                  ))
                )}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
    </Field.Root>
  )
}

Combobox.displayName = 'Combobox'

export default Combobox
