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

export const Default: Story = {}
