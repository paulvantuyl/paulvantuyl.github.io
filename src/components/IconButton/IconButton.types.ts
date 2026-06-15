import type { ButtonHTMLAttributes } from 'react'
import type { IconName } from '../Icon/Icon'

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> {
  icon: IconName
  /**
   * Accessible label announced by screen readers.
   * This will be visually hidden but still readable by assistive tech.
   */
  label: string
  className?: string
}

