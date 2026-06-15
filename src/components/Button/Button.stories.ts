import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '.'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Click me',
    type: 'button',
  },
    parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

export const LeadingIcon: Story = {
  args: {
    leadingIcon: 'arrow-left',
    children: 'Back',
  },
}

export const TrailingIcon: Story = {
  args: {
    trailingIcon: 'arrow-right',
    children: 'Next',
  },
}

export const BothIcons: Story = {
  args: {
    leadingIcon: 'bars',
    trailingIcon: 'external-link-alt',
    children: 'Action',
  },
}
