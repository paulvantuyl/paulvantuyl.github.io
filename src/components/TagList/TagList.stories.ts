import type { Meta, StoryObj } from '@storybook/react'
import TagList from './TagList'

const meta: Meta<typeof TagList> = {
  title: 'Components/TagList',
  component: TagList,
}

export default meta
type Story = StoryObj<typeof TagList>

export const Default: Story = {
  args: {
    tags: [
      { value: 'tag1' },
      { value: 'tag2' },
      { value: 'tag3' },
    ],
  },
}