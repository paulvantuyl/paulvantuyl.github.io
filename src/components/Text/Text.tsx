import type { ElementType } from 'react'
import type { TextProps } from './Text.types'
import './Text.css'

export function Text({ variant = 'p', className = '', children, ...props }: TextProps) {
  const Component = variant as ElementType
  const variantClass = `text-${variant}`
  const classes = className ? `text ${variantClass} ${className}` : `text ${variantClass}`

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}

