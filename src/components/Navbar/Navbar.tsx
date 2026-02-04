import { Link, NavLink } from 'react-router-dom'

export function Navbar() {
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
                    <nav aria-label="Main navigation" className="content-center">
                        <NavLink
                            to="/"
                            className={({ isActive }) => 
                                `${isActive ? 'active' : 'inactive'}`
                            }
                        >
                            Start
                        </NavLink>
                        <NavLink
                            to="/work"
                            className={({ isActive }) => 
                                `${isActive ? 'active' : 'inactive'}`
                            }
                        >
                            Work
                        </NavLink>
                        <NavLink
                            to="/colors"
                            className={({ isActive }) => 
                                `${isActive ? 'active' : 'inactive'}`
                            }
                        >
                            Colors
                        </NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
}
