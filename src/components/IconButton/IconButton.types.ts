import type { ButtonHTMLAttributes } from 'react'
import type { IconDefinition } from '@paulvantuyl/pro-duotone-svg-icons'

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> {
  icon: IconDefinition
  /**
   * Accessible label announced by screen readers.
   * This will be visually hidden but still readable by assistive tech.
   */
  label: string
  className?: string
}

