import React from 'react';
import { Link } from 'react-router-dom';
import { formatString, formatDuration, formatDate } from "../../utils/helpers";

const VideoPlayListCard = ({ id, thumbnail, title, duration, durationWatched, createDate }) => {
  const progress = durationWatched / duration * 100;
  const formatedTitle = formatString(title, 65);
  const formatedDuration = formatDuration(duration);
  const formatedDate = formatDate(createDate);
  return (
    // TODO customize playlist card
    <Link to={`/view/${id}`} className="snap-center md:snap-start scroll-mx-6 shrink-0 w-[80%] sm:w-72 md:w-80 lg:w-96">
      <div className="relative overflow-hidden rounded-md shadow-md bg-gray-800 shrink-0 image-container">
        {/* Thumbnail */}
        <div className="w-full h-0" style={{ paddingBottom: '56.25%' }}>
          <img
            src={thumbnail}
            alt={formatedTitle}
            className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 transform hover:scale-110 ease-in-out"
          />
          <span className="absolute bottom-3 right-2 px-2 py-1 text-xs font-semibold text-white bg-black bg-opacity-75 rounded">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5" />
            </svg>
          </span>
          
        </div>
      </div>
      {/* Video Info */}
      <div className="mt-2 px-1">
        <h3 className="text-lg font-medium text-white">{formatedTitle}</h3>
        <p className="text-md font-medium text-gray-400">{formatedDate}</p>
      </div>
    </Link>
  );
}

export default VideoPlayListCard;
