import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavList = ({ children }) => {

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(location.pathname);

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location]);

    const navItems = [
        { label: 'Home', path: '/home' },
        { label: 'Videos', path: '/videos' },
        { label: 'Photos', path: '/photos' },
        { label: 'Music', path: '/music' },
        { label: 'Documents', path: '/documents' },
    ];

    return (
        <ul className="flex flex-col lg:p-0 mt-2 lg:font-medium rounded-md lg:space-x-8 lg:flex-row lg:mt-0">
            {navItems.map((item) => (
                <li key={item.label}>
                    <Link
                        to={item.path}
                        className={`block py-2 px-3 rounded lg:p-0 lg:dark:hover:text-blue-500 dark:border-gray-700
                            ${currentPage === item.path ?
                                'text-white bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:dark:text-blue-500 lg:font-bold'
                                :
                                'text-gray-900 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-hover dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                            }`}
                        aria-current={currentPage === item.path ? 'page' : null}
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>

    );
}

<li>
    <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 lg:dark:text-blue-500" aria-current="page">Home</a>
</li>

export default NavList;