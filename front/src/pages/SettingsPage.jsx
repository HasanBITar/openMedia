

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import SidebarLayout from "../layouts/SidebarLayout";
import SettingsSidebar from "../components/sidebar/SettingsSidebar";
import GroupSubPage from "../components/SubPages/GroupSubPage";


const SettingsPage = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(location.pathname);
    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location]);

    return (
        <SidebarLayout sidebar={SettingsSidebar}>
            {currentPage === '/groups' && <GroupSubPage />}
        </SidebarLayout>
    );
}

export default SettingsPage;
