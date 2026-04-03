import type { Meta, StoryObj } from '@storybook/react-vite'
import Input from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'Name',
        placeholder: 'Enter your name',
    },
}

export const WithLabelHidden: Story = {
    args: {
        label: 'Name',
        placeholder: 'Enter your name',
        labelHidden: true,
    },
}

export const Disabled: Story = {
    args: {
        label: 'Name',
        placeholder: 'Enter your name',
        disabled: true,
    },
}