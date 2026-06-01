import type { Meta, StoryObj } from '@storybook/react'
import TagList from './TagList'

const meta: Meta<typeof TagList> = {
  title: 'Components/TagList',
  component: TagList,
}

export default meta
type Story = StoryObj<typeof TagList>

/**
 * A TagList takes an array of string values and displays them as a list with trailing ampersands.
 */

export const Default: Story = {
  args: {
    variant: 'h5',
    tags: [
      { value: 'Apples' },
      { value: 'Bananas' },
      { value: 'Pears' },
    ],
  },
}

/**
 * If the tag array returns empty, a simple message is displayed.
 */

export const NoTags: Story = {
  args: {
    variant: 'h5',
    tags: [],
  },
}