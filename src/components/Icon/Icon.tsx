import * as regularIcons from '@paulvantuyl/pro-regular-svg-icons'
import type { IconDefinition } from '@paulvantuyl/pro-regular-svg-icons'

export type IconName = string

export interface IconProps {
  name: IconName
  className?: string
  title?: string
  ariaLabel?: string
}

const iconLookup = new Map<string, IconDefinition>()

for (const [exportName, exportedValue] of Object.entries(regularIcons)) {
  if (!exportName.startsWith('fa')) {
    continue
  }

  const value = exportedValue as Partial<IconDefinition>
  if (!value || !Array.isArray(value.icon)) {
    continue
  }

  iconLookup.set(exportName, exportedValue as IconDefinition)

  const kebabName = exportName
    .slice(2)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
  iconLookup.set(kebabName, exportedValue as IconDefinition)
}

function getIconDefinition(name: IconName): IconDefinition | undefined {
  if (!name) {
    return undefined
  }

  if (iconLookup.has(name)) {
    return iconLookup.get(name)
  }

  const exportName = name.startsWith('fa')
    ? name
    : `fa${name
        .split('-')
        .filter(Boolean)
        .map((part) => part[0]?.toUpperCase() + part.slice(1))
        .join('')}`

  return iconLookup.get(exportName)
}

export function Icon({ name, className = '', title, ariaLabel }: IconProps) {
  const icon = getIconDefinition(name)

  if (!icon) {
    if (import.meta.env.DEV) {
      console.warn(`[Icon] Unknown icon name "${name}".`)
    }

    return null
  }

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

