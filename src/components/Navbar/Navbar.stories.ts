import type { Meta, StoryObj } from '@storybook/react-vite'
import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../../theme'
import { Navbar } from '.'

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  decorators: [
    (Story) => createElement(
      ThemeProvider,
      null,
      createElement(
        MemoryRouter,
        null,
        createElement(Story)
      )
    ),
  ],
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

/** Navbar component is updated by a config file. Routes and page names are stored in JSON. The Navbar is then included on each view with the Layout component. */

export const Default: Story = {}
