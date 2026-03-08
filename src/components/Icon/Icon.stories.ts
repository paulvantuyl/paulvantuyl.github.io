import type { Meta, StoryObj } from '@storybook/react-vite'
import { faBars, faArrowRight } from '@paulvantuyl/pro-duotone-svg-icons'
import { Icon } from '.'

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    icon: faBars,
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Decorative: Story = {}

export const Labelled: Story = {
  args: {
    icon: faArrowRight,
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

