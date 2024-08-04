import { useState, useRef } from 'react';

import Logo from './Logo'
import ProfileMenu from './ProfileMenu'
import NavList from './NavList';
import NavSearch from './NavSearch'

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-50 h-16">
      <div className="max-w-screen-xxl flex flex-wrap items-center justify-between mx-auto p-3 overflow-y-auto lg:overflow-y-visible bg-gray-900 lg:bg-transparent shadow-2xl lg:shadow-none">
        <Logo />

        {/* #TODO update the navbar according to signin state */}

        <div className="flex lg:order-2">
          <ProfileMenu />

          <NavSearch className="hidden lg:block" value={searchQuery} onChange={handleSearch} />

          <button onClick={handleOpenMenu} type="button" className="ml-2 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-hover dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
            <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between w-full mr-auto ml-0 bg-gray-800 rounded-md p-2 mt-2 
          lg:border-none lg:flex lg:w-auto lg:order-1 lg:ml-6 lg:bg-transparent lg:mt-0 ${isMenuOpen ? 'block' : 'hidden lg:block'}`}
        >
          <NavSearch className="lg:hidden" value={searchQuery} onChange={handleSearch} />
          <NavList />
        </div>


      </div>
    </nav>
  )
}

export default Navbar;