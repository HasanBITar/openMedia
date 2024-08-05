import SidebarLayout from "../layouts/SidebarLayout";
import LibSidebar from "../components/sidebar/LibSidebar";
import AudioSubPage from "../components/SubPages/AudioSubPage";

const AudioLib = () => {
  return (
    <SidebarLayout sidebar={LibSidebar}>
      <AudioSubPage />
    </SidebarLayout>
  );
}

export default AudioLib;
