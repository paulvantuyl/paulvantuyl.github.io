import type { Meta, StoryObj } from '@storybook/react-vite'
import Combobox from './Combobox'

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
]

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Search fruits...',
  },
}

export const WithLabel: Story = {
  args: {
    options: defaultOptions,
    label: 'Select a fruit',
    placeholder: 'Search fruits...',
  },
}

export const WithDefaultValue: Story = {
  args: {
    options: defaultOptions,
    value: 'banana',
    label: 'Select a fruit',
    placeholder: 'Search fruits...',
  },
}

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    disabled: true,
    label: 'Disabled combobox',
    value: 'apple',
    placeholder: 'Search fruits...',
  },
}

export const WithManyOptions: Story = {
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      value: i,
      label: `Option ${i + 1}`,
    })),
    label: 'Select from many options',
    placeholder: 'Type to filter...',
  },
}
