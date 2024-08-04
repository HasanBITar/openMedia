// ContextMenu.js
import React, { useState, useRef, useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const ContextMenu = ({ className, icon = <BsThreeDotsVertical size={24} />, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={"relative inline-block z-30 " + className} ref={menuRef}>
            <button
                onClick={handleToggle}
                className="mt-2 ml-2 rounded-full hover:text-gray-300 transition-color ease-in-out hover:cursor-pointer"
            >
                {icon}
            </button>
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-48 bg-gray-menu rounded-md shadow-lg transition-opacity duration-300 ease-in-out z-50 overflow-hidden p-1"
                    style={{ opacity: isOpen ? 1 : 0 }}
                >
                    <ul>
                        <li className="p-3 hover:bg-gray-hover cursor-pointer transition-all ease-in-out">Option 1</li>
                        <li className="p-3 hover:bg-gray-hover cursor-pointer transition-all ease-in-out">Option 2</li>
                        <li className="p-3 hover:bg-gray-hover cursor-pointer transition-all ease-in-out">Option 3</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ContextMenu;
