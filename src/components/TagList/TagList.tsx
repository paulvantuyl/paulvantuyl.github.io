import { Text } from '../Text'
import type { TagListProps } from './TagList.types'

const TagList = ({
  tags,
  ...props
}: TagListProps) => {
  return (
    <div {...props}>
      { tags.length > 1 && (
        <>
          <Text variant="h5" className="post-tags">
            { tags.map((tag) => (
              <span>{tag.value}&amp;<br /></span>
            ))}
          </Text>
        </>
      )}
      { tags.length === 1 && (
        <>
          <Text variant="h5" className="post-tags">
            { tags.map((tag) => (
              <span>{tag.value}</span>
            ))}
          </Text>
        </>
      )}
      { tags.length === 1 && (
        <>
          <Text variant="h5" className="post-tags">
            <span>No tags</span>
          </Text>
        </>
      )}
    </div>
  )
}

TagList.displayName = 'TagList'

export default TagList