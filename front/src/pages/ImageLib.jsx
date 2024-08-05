import SidebarLayout from "../layouts/SidebarLayout";
import LibSidebar from "../components/sidebar/LibSidebar";
import ImageSubPage from "../components/SubPages/ImageSubPage";
import { useGetFilesQuery } from "../api/filesAPI";
import { fileTypes, API } from "../config";

const ImageLib = () => {
  const page=1;
  const { data, error, isLoading } = useGetFilesQuery({
    type: fileTypes.image,
    page,
  });

  return (
    <SidebarLayout sidebar={LibSidebar}>
      <ImageSubPage data={data} error={error} isLoading={isLoading}   />
    </SidebarLayout>
  );
};

export default ImageLib;
