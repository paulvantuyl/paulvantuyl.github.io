import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from '.'

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    name: 'bars',
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Decorative: Story = {}

export const Labelled: Story = {
  args: {
    name: 'arrow-right',
    title: 'Next',
    ariaLabel: 'Next',
  },
}

export const Large: Story = {
  args: {
    className: 'text-3xl',
  },
}

export const PrimaryColor: Story = {
  args: {
    className: 'text-red-600',
  },
}

