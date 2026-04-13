import { useEffect, useMemo, useState } from 'react'
import { Field } from '@base-ui/react/field'
import { Select as BaseSelect } from '@base-ui/react/select'
import { Icon } from '../Icon'
import type { SelectProps } from './Select.types'
import './Select.css'

const Select = ({
  options,
  value,
  onChange,
  label,
  labelHidden = false,
  stretch = false,
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

  return (
    <Field.Root className={`select-container${stretch ? ' grow' : ''} ${className}`} disabled={disabled} {...props}>
      {label && (
        <Field.Label
          nativeLabel={false}
          className={`select-label${labelHidden ? ' select-label-hidden' : ''}`}
        >
          {label}
        </Field.Label>
      )}
      {description && <Field.Description className="select-description">{description}</Field.Description>}
      <BaseSelect.Root<string | number> value={selected} onValueChange={handleChange} disabled={disabled}>
        <div className="relative">
          <BaseSelect.Trigger className="select-button">
            <BaseSelect.Value className="select-button-label">
              {() => selectedOption?.label ?? placeholder}
            </BaseSelect.Value>
            <BaseSelect.Icon className="select-button-icon">
              <Icon name="chevron-down" className="button-icon" />
            </BaseSelect.Icon>
          </BaseSelect.Trigger>
          <BaseSelect.Portal>
            <BaseSelect.Positioner side="bottom" align="start" sideOffset={8} className="select-options-positioner">
              <BaseSelect.Popup className="select-options">
                <BaseSelect.List>
                  {options.map((option) => (
                    <BaseSelect.Item key={String(option.value)} value={option.value} className="select-option">
                      <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                    </BaseSelect.Item>
                  ))}
                </BaseSelect.List>
              </BaseSelect.Popup>
            </BaseSelect.Positioner>
          </BaseSelect.Portal>
        </div>
      </BaseSelect.Root>
    </Field.Root>
  )
}

Select.displayName = 'Select'

export default Select
