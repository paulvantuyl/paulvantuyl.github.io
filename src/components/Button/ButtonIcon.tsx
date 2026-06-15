import type { IconDefinition } from '@paulvantuyl/pro-regular-svg-icons'

interface ButtonIconProps {
  icon: IconDefinition
  className?: string
}

export function ButtonIcon({ icon, className = '' }: ButtonIconProps) {
  const [width, height, , , pathData] = icon.icon
  const paths = Array.isArray(pathData) ? pathData : [pathData]

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden
    >
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
