import { Link, useLocation } from 'react-router-dom'
import { Tab, TabGroup, TabList } from '@headlessui/react'

export function Navbar() {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path

    return (
        <header role="navigation" className="w-screen animated fadeIn delayAlpha">
            <div className="max-w-7xl mx-auto px-4">
                <div className="top-bar flex justify-start">
                    <Link
                        to="/"
                        className="brand block h-full content-center rounded-none px-4 pt-1 pb-2 focus:shadow-[0_0_0_2px]"
                    >
                        <span className="logo h-4">
                            <svg id="pvtLogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 332 287.6">
                            <path id="pyramid" d="M166 0L0 287.6h332L166 0zm138.3 271.6h-97l-40.9-70.9 72.7-42 65.2 112.9zm-73.1-126.9l-72.7 42-40.9-70.8 48.5-84 65.1 112.8zM108.3 132l80.6 139.5H27.8L108.3 132z"/>
                            </svg>
                        </span>
                    </Link>
                    <TabGroup className="content-center">
                        <TabList as="nav" aria-label="Main navigation" className="flex content-center">
                            <Tab
                                as={Link}
                                to="/"
                                className={`focus:shadow-[0_0_0_2px] ${isActive('/') ? 'bg-dark-red' : ''}`}
                            >
                                Start
                            </Tab>
                            <Tab
                                as={Link}
                                to="/work"
                                className={`focus:shadow-[0_0_0_2px] ${isActive('/work') ? 'bg-dark-red' : ''}`}
                            >
                                Work
                            </Tab>
                            <Tab
                                as={Link}
                                to="/colors"
                                className={`focus:shadow-[0_0_0_2px] ${isActive('/colors') ? 'bg-dark-red' : ''}`}
                            >
                                Colors
                            </Tab>
                        </TabList>
                    </TabGroup>
                </div>
            </div>
        </header>
    );
}
