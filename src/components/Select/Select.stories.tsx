import type { Meta, StoryObj } from '@storybook/react-vite'
import Select from './Select'

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    viewport: {
        viewports: {
            custom: {
                name: 'Custom',
                styles: {
                    height: '500px',
                }
            }
        }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
]

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option...',
  },
}

export const WithLabel: Story = {
  args: {
    options: defaultOptions,
    label: 'Choose an item',
    placeholder: 'Select an option...',
  },
}

export const WithDefaultValue: Story = {
  args: {
    options: defaultOptions,
    value: 'option2',
    label: 'Choose an item',
  },
}

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    disabled: true,
    label: 'Disabled select',
    value: 'option1',
  },
}
