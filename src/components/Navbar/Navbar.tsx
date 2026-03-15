import { Link, NavLink } from 'react-router-dom';
import navItems from './navbar.config.json';
import { useTheme } from '../../theme';
import { Switch } from '@headlessui/react'
import { Icon } from '../Icon';
import './Navbar.css';

type NavItem = {
  to: string
  label: string
}

const items = navItems as NavItem[]

export function Navbar() {
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <header role="navigation" className="animated fadeIn delayAlpha">
      <div className="max-w-7xl mx-auto px-4">
        <div className="top-bar flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link
              to="/"
              className="brand block h-full content-center rounded-none px-4 pt-1 pb-2"
            >
              <span className="logo h-4">
                <svg id="pvtLogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 332 287.6">
                  <path id="pyramid" d="M166 0L0 287.6h332L166 0zm138.3 271.6h-97l-40.9-70.9 72.7-42 65.2 112.9zm-73.1-126.9l-72.7 42-40.9-70.8 48.5-84 65.1 112.8zM108.3 132l80.6 139.5H27.8L108.3 132z" />
                </svg>
              </span>
            </Link>
            <nav aria-label="Main navigation" className="content-center">
              {items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `${isActive ? 'active' : 'inactive'}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="sun" className="fill-black/70 dark:fill-white/70" />
            <Switch
              checked={resolvedTheme === 'dark'}
              onChange={toggleTheme}
              className="group relative flex h-7 w-14 cursor-pointer bg-black/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-white/10 data-focus:outline data-focus:outline-white dark:bg-white/10"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-5 translate-x-0 bg-black/70 shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7 dark:bg-white/70"
              />
            </Switch>
            <Icon name="moon" className="fill-black/70 dark:fill-white/70" />
          </div>
        </div>
      </div>
    </header>
  )
}
