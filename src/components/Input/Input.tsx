import type { ComponentPropsWithoutRef } from 'react';
import { Input as BaseInput } from '@base-ui/react/input';
import type { InputProps } from './Input.types';
import './Input.css';

type BaseInputProps = ComponentPropsWithoutRef<typeof BaseInput>;

export default function Input({
  label,
  placeholder,
  labelHidden = false,
  stretch = false,
  disabled = false,
  onChange,
  ...props
}: InputProps) {
  const handleChange: BaseInputProps['onChange'] = (event) => {
    onChange?.(event.target.value);
  };

  return (
    <label className={`Label${stretch ? ' w-full' : ''}`}>
      <span className={`label-text${labelHidden ? ' input-label-hidden' : ''}`}>{label}</span>
      <BaseInput
        {...props}
        className={`Input`}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
      />
    </label>
  );
}
