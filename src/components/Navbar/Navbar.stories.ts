import type { Meta, StoryObj } from '@storybook/react-vite'
import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Navbar } from '.'

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  decorators: [
    (Story) => createElement(MemoryRouter, null, createElement(Story)),
  ],
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
