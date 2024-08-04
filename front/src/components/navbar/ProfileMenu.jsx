import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { openUploadModal } from '../../store/UISlice'

const ProfielMenu = () => {
  const authState = useSelector((state) => state.auth);
  const { username, email, photo } = authState.user;
  const dispatch = useDispatch();

  // Menu Open
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (e) => {
    setIsOpen(!isOpen);
  };

  // UploadModal

  const handleUploadClick = () => {
    setIsOpen(!isOpen);
    dispatch(openUploadModal());
  };

  return (
    <div className="flex items-center lg:order-2 space-x-3 lg:space-x-0 pl-4 pr-2 relative">
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full lg:me-0 focus:ring-4 dark:focus:ring-gray-600"
        onClick={handleClick}
      >
        <img
          className="w-9 h-9 rounded-full"
          src={photo || "./images/user-profile.png"}
          alt="user photo"
        />
      </button>

      {isOpen && (
        <div className="z-50 text-base list-non bg-gray-menu rounded-md shadow-lg transition-opacity duration-300 ease-in-out p-1 fixed top-16 lg:right-2 right-4">
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">{username}</span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{email}</span>
            <button
              onClick={handleUploadClick}
              data-modal-target="progress-modal" data-modal-toggle="progress-modal" className="my-2 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full" type="button">
              Upload
            </button>
          </div>
          <ul className="" aria-labelledby="user-menu-button">
            <li>
              <Link to="#" className="block px-4 py-2 text-sm dark:hover:bg-gray-hover dark:text-gray-200 dark:hover:text-white">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="#" className="block px-4 py-2 text-sm dark:hover:bg-gray-hover dark:text-gray-200 dark:hover:text-white">
                Settings
              </Link>
            </li>
            <li>
              <Link to="#" className="block px-4 py-2 text-sm dark:hover:bg-gray-hover dark:text-gray-200 dark:hover:text-white">
                Earnings
              </Link>
            </li>
            <li>
              <Link to="#" className="block px-4 py-2 text-sm dark:hover:bg-gray-hover dark:text-gray-200 dark:hover:text-white">
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfielMenu;
