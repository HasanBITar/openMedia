import React, { useEffect, useState } from 'react';
import { FaTags } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";

import { API } from '../config';
import VideoPlayer from '../components/viewers/VideoPlayer';
import { useParams } from 'react-router-dom';
import SidebarLayout from '../layouts/SidebarLayout';
import FileSidebar from '../components/sidebar/FileSidebar';
import LoadingPage from '../pages/LoadingPage';
import { useGetFileQuery } from '../api/filesAPI';
import { extractFilename, formatDate } from '../utils/helpers';
import SubButton from '../components/buttons/SubButton';
import CommentInput from '../components/inputs/CommentInput';
import Rating from '../components/inputs/Rating';
import Comment from '../components/others/Comment';

const cc = [
  {
    username: "Mahmoud",
    date: "2024-08-04T15:10:19.461Z",
    content: "very nice movie, can't wait for part 2!"
  },
  {
    username: "Mohammad",
    date: "2024-08-04T15:10:19.461Z",
    content: "I mean it's alright"
  }
]

const VideoPage = ({ }) => {
  const { videoId } = useParams();
  console.log(videoId);
  const [streamUrl, setStreamUrl] = useState('');
  const { data, error, isLoading } = useGetFileQuery({ fileId: videoId });

  useEffect(() => {
    if (data && !isLoading) {
      const url = API.steamVideo + videoId;
      console.log(url);
      console.log(videoId);
      console.log(data);
      setStreamUrl(url);
    }
  }, [data, isLoading, videoId]);

  if (isLoading) return <LoadingPage />
  return (
    <SidebarLayout sidebar={FileSidebar} >
      <div className='flex justify-center flex-col'>
        <div className='flex-1'>
          {error && <p>Error loading video.</p>}
          {!isLoading && !error && streamUrl && <VideoPlayer streamUrl={streamUrl} />}
          <div className='py-7 px-5 -mt-3 bg-gray-900'>
            <div>
              <p className="flex font-bold text-lg lg:text-xl text-white">{extractFilename(data.location)}</p>
              <p className="flex text-md lg:text-lg text-gray-400">{formatDate(data.createDate)}</p>
            </div>
            <div className='flex justify-between'>
              <Rating />
              <div className='flex justify-end space-x-2'>
                <SubButton>
                  <FaTags className='mr-2' /> Add Tag
                </SubButton>
                <SubButton>
                  <FaShare className='mr-2' /> Share
                </SubButton>
              </div>
            </div>
          </div>
        </div>
        <div className="not-prose relative  overflow-hidden bg-black">
          <div className="absolute inset-0 bg-gray-800 !rounded-t-lg lg:!rounded-t-xl"></div>
          <div className="relative overflow-auto">
            <div className="overscroll-contain overflow-auto hide-scroll-bar p-5 lg:p-8">
              <div className="bg-gray-800 sticky top-0 z-10 rounded-t-md mb-3">
                <p className="flex font-bold text-xl lg:text-2xl text-white">Add Comment</p>
              </div>
              <CommentInput />
              <br></br>
              <div className="bg-gray-800 sticky top-0 z-10 rounded-t-md mt-5 mb-2">
                <p className="flex font-bold text-xl lg:text-2xl text-white">Comments</p>
              </div>

              {cc.map(i => <Comment username={i.username} date={i.date} content={i.content} />)}

            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-md"></div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default VideoPage;
