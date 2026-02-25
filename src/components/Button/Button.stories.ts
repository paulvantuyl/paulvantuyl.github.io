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
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}
