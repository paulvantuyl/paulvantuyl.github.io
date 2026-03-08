import type { IconDefinition } from '@paulvantuyl/pro-duotone-svg-icons'

export interface IconProps {
  icon: IconDefinition
  className?: string
  title?: string
  ariaLabel?: string
}

export function Icon({ icon, className = '', title, ariaLabel }: IconProps) {
  const [width, height, , , pathData] = icon.icon
  const paths = Array.isArray(pathData) ? pathData : [pathData]

  const accessibilityProps = ariaLabel
    ? { 'aria-label': ariaLabel, role: 'img' as const }
    : { 'aria-hidden': true }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      width="1em"
      height="1em"
      fill="currentColor"
      {...accessibilityProps}
    >
      {title && <title>{title}</title>}
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          className={paths.length === 2 ? (i === 0 ? 'fa-secondary' : 'fa-primary') : undefined}
        />
      ))}
    </svg>
  )
}

