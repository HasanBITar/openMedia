import { extractFilename, formatBytes, formatDate, formatDuration } from "../../utils/helpers"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaUserGroup, FaTags } from "react-icons/fa6";
import { MdSecurity } from "react-icons/md";

const SettingsSidebar = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(location.pathname);
    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location]);

    const Field = ({ url, children }) => {
        return (
            <li>
                <Link to={url} className={`transition-colors ease-in-out text-md lg:text-lg inline-flex items-center p-3 px-4 rounded-lg active w-full dark:hover:bg-gray-700 ${currentPage === url ? 'text-white bg-blue-700' : 'dark:bg-gray-input hover:text-white'}`} aria-current="page">
                    {children}
                </Link>
            </li>
        );
    };

    return (
        <div className="p-3">
            <h2 className="flex font-bold text-xl lg:text-2xl text-white">Settings</h2>
            <br></br>
            <div className="flex-1">
                <ul className="flex-column space-y space-y-5 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Field url={'/settings'}>
                        <FaUser className="w-6 h-6 me-2" />
                        Profile
                    </Field>
                    <Field url={'/tags'}>
                        <FaTags className="w-6 h-6 me-2" />
                        Tags
                    </Field>
                    <Field url={'/groups'}>
                        <FaUserGroup className="w-6 h-6 me-2" />
                        Groups
                    </Field>
                    <Field url={'/permissions'}>
                        <MdSecurity className="w-6 h-6 me-2" />
                        Permissions
                    </Field>
                </ul>
            </div>
        </div>
    )
}


export default SettingsSidebar;