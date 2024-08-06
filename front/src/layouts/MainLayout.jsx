import { Outlet } from "react-router-dom";

import NavBar from "../components/navbar/Navbar";
import UploadModal from "../Modals/UploadModal";
import PermissionModal from "../Modals/PermissionModal";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <UploadModal />
      <PermissionModal />
      <main className="w-full p-3 pt-0 bg-gray-900 text-white">
        <Outlet />
      </main>
      {/* <footer>
                <p>Footer content</p>
            </footer> */}
    </>
  );
};

export default MainLayout;
