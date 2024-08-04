import React, { useEffect, useState } from 'react';

import { API } from '../config';
import VideoPlayer from '../components/viewers/VideoPlayer';
import { useParams } from 'react-router-dom';
import SidebarLayout from '../layouts/SidebarLayout';
import FileSidebar from '../components/sidebar/FileSidebar';

const VideoPage = ({ }) => {
  const { videoId } = useParams();
  const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    const url = API.steamVideo + videoId;
    console.log(url);
    setStreamUrl(url);
  }, [videoId]);

  return (
    <SidebarLayout sidebar={FileSidebar}>
      <div className='p-5 lg:p-8'>
        <h1 className="flex pb-5 font-bold text-2xl md:text-4xl text-white">Cool Video</h1>
        <div className='flex justify-center'>
          <div className='flex-1'>
            {streamUrl && <VideoPlayer streamUrl={streamUrl} />}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default VideoPage;
