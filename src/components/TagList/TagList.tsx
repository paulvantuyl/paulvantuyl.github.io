import { Text } from '../Text'
import type { TagListProps } from './TagList.types'
import './TagList.css'

const TagList = ({
  tags,
  variant,
  ...props
}: TagListProps) => {
  return (
    <div {...props}>
      { tags.map((tag, index) => 
        <Text key={index} variant={variant} className="tag-list">
          <span>
            {tag.value}
            {index < tags.length - 1 && <span>&amp;<br /></span>}
          </span>
        </Text>
      )}
      { tags.length < 1 && (
        <>
          <Text variant={variant} className="tag-list">
            <span>No tags</span>
          </Text>
        </>
      )}
    </div>
  )
}

TagList.displayName = 'TagList'

export default TagList