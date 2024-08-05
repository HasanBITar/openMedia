import SidebarLayout from "../layouts/SidebarLayout";
import LibSidebar from "../components/sidebar/LibSidebar";
import ImageSubPage from "../components/SubPages/ImageSubPage";

const ImageLib = () => {
  return (
    <SidebarLayout sidebar={LibSidebar}>
      <ImageSubPage />
    </SidebarLayout>
  );
};

export default ImageLib;
