import SidebarLayout from "../layouts/SidebarLayout";
import VideoSubPage from "../components/SubPages/VideoSubPage";
import LibSidebar from "../components/sidebar/LibSidebar";

const VideoLib = () => {
  return (
    <SidebarLayout sidebar={LibSidebar}>
      <VideoSubPage />
    </SidebarLayout>
  );
}

export default VideoLib;
