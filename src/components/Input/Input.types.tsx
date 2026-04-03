import type { ComponentPropsWithoutRef } from 'react'
import { Input as BaseInput } from '@base-ui/react/input';

type BaseInputProps = ComponentPropsWithoutRef<typeof BaseInput>;

export interface InputProps extends Omit<BaseInputProps, 'onChange'> {
    label?: string;
    onChange?: (value: string | number | null) => void;
    placeholder?: string;
    labelHidden?: boolean;
    disabled?: boolean;
}