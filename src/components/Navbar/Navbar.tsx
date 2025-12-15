import { Link, useLocation } from 'react-router-dom'
import { NavigationMenu } from 'radix-ui'

export function Navbar() {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path

    return (
        <NavigationMenu.Root className="relative z-10 flex w-screen justify-left bg-dark-purple">
            <NavigationMenu.List className="center mb-0 mt-1 flex list-none rounded-none p-0">
                <NavigationMenu.Item>
                    <Link
                        to="/"
                        className="block h-full content-center rounded-none px-4 pt-1 pb-2 focus:shadow-[0_0_0_2px]"
                    >
                        <img src="/assets/phvt-triangle-white.svg" alt="Paul Van Tuyl" className="h-4" />
                    </Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <Link
                        to="/"
                        className={`block rounded-none ps-4 pe-12 py-2 leading-none no-underline outline-none focus:shadow-[0_0_0_2px] ${isActive('/') ? 'bg-muted-purple' : ''}`}
                    >
                        Start
                    </Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <Link
                        to="/colors"
                        className={`block rounded-none ps-4 pe-12 py-2 leading-none no-underline outline-none focus:shadow-[0_0_0_2px] ${isActive('/colors') ? 'bg-muted-purple' : ''}`}
                    >
                        Colors
                    </Link>
                </NavigationMenu.Item>
            </NavigationMenu.List>
        </NavigationMenu.Root>
    );
}
