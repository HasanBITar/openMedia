

import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import SidebarLayout from "../layouts/SidebarLayout";
import SettingsSidebar from "../components/sidebar/SettingsSidebar";
import GroupSubPage from "../components/SubPages/GroupSubPage";
import GroupInfoSubPage from "../components/SubPages/GroupInfoSubPage";
import TagsSubPage from "../components/SubPages/TagsSubPage";
// import { Route } from "react-router-dom";

const SettingsPage = () => {
    const { groupId } = useParams();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(location.pathname);
    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location]);

    const isGroup = location.pathname.startsWith('/groups')
    return (
        <SidebarLayout sidebar={SettingsSidebar}>
            
            {isGroup && groupId ? (
                <GroupInfoSubPage groupId={groupId} />
            ) : isGroup ? (
                currentPage === '/groups' && <GroupSubPage />
            ) :
                <TagsSubPage    />
            }
        </SidebarLayout>
    );
}

export default SettingsPage;
