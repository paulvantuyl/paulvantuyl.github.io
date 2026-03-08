import type { Meta, StoryObj } from '@storybook/react-vite'
import { faBars } from '@paulvantuyl/pro-duotone-svg-icons'
import { IconButton } from '.'

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    icon: faBars,
    label: 'Open navigation menu',
    type: 'button',
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

