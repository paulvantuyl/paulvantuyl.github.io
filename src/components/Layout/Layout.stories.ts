import type { Meta, StoryObj } from '@storybook/react-vite'
import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Layout } from '.'

const meta = {
  title: 'Components/Layout',
  component: Layout,
  tags: ['autodocs'],
  decorators: [
    (Story) => createElement(MemoryRouter, null, createElement(Story)),
  ],
  args: {
    children: 'This is sample content inside the layout.',
  },
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Default Layout',
    subtitle: 'A single-column layout.',
    children: createElement(
      'div',
      null,
      createElement('p', null, 'Main content region.')
    ),
  },
}

export const Sidebar: Story = {
  args: {
    title: 'Sidebar Layout',
    subtitle: 'A two-column layout with supporting content in the sidebar.',
    variant: 'sidebar',
    children: createElement(
      'div',
      null,
      createElement('p', null, 'Main content appears in the left column.'),
      createElement('p', null, 'Use this area for the primary page narrative or details.')
    ),
    sidebarContent: createElement(
      'div',
      null,
      createElement('h4', null, 'Sidebar'),
      createElement('p', null, 'Secondary details, links, or metadata can go here.'),
      createElement(
        'ul',
        null,
        createElement('li', null, 'Quick links'),
        createElement('li', null, 'Status blocks'),
        createElement('li', null, 'Related resources')
      )
    ),
  },
}
