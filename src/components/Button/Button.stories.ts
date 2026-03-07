import type { Meta, StoryObj } from '@storybook/react-vite'
import { faArrowLeft, faArrowRight, faBars, faExternalLinkAlt } from '@paulvantuyl/pro-duotone-svg-icons'
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

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

export const LeadingIcon: Story = {
  args: {
    leadingIcon: faArrowLeft,
    children: 'Back',
  },
}

export const TrailingIcon: Story = {
  args: {
    trailingIcon: faArrowRight,
    children: 'Next',
  },
}

export const BothIcons: Story = {
  args: {
    leadingIcon: faBars,
    trailingIcon: faExternalLinkAlt,
    children: 'Action',
  },
}
