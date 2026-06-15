import type { Meta, StoryObj } from '@storybook/react-vite'
import { createElement } from 'react'
import { Text } from '.'

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children: 'Sample text',
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading level 1',
  },
}

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading level 2',
  },
}

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading level 3',
  },
}

export const Heading4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading level 4',
  },
}

export const Heading5: Story = {
  args: {
    variant: 'h5',
    children: 'Heading level 5',
  },
}

export const Paragraph: Story = {
  args: {
    variant: 'p',
    children:
      'This is a paragraph of body text demonstrating the default typography settings used throughout the site.',
  },
}

export const UnorderedList: Story = {
  args: {
    variant: 'ul',
    children: [
      createElement('li', { key: 'first' }, 'First item'),
      createElement('li', { key: 'second' }, 'Second item'),
      createElement('li', { key: 'third' }, 'Third item'),
    ],
  },
}

export const OrderedList: Story = {
  args: {
    variant: 'ol',
    children: [
      createElement('li', { key: 'first' }, 'First step'),
      createElement('li', { key: 'second' }, 'Second step'),
      createElement('li', { key: 'third' }, 'Third step'),
    ],
  },
}

