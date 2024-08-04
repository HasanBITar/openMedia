/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatString, formatDate } from "../../utils/helpers";

const AudioCard = ({ id, thumbnail, title, type, createDate, artist, all }) => {
  const formatedTitle = formatString(title, 20);
  const formatedDate = formatDate(createDate);
  return (
    <Link to={`/view/${id}`} className="snap-center md:snap-start scroll-mx-6 shrink-0 w-[33%] sm:w-36 md:w-44 lg:w-48">
      <div className="relative overflow-hidden rounded-lg shadow-md bg-gray-800 shrink-0">
        {/* Thumbnail */}
        <div
          className={all ? "w-full h-0 " : "w-full h-0 rotate-continuous"}
          style={{ paddingBottom: "100%" }}
        >
          <img
            src={thumbnail}
            alt={formatedTitle}
            className={
              all
                ? "absolute inset-0 object-cover w-full h-full transition-transform duration-300 transform hover:scale-110"
                : "absolute inset-0 object-cover w-full h-full rounded-full transition duration-500 ease-in-out"
            }
          />
        </div>
      </div>
      {/* Video Info */}
      <div className="mt-2 text-center">
        <h3 className="text-lg font-medium text-white overflow-hidden text-ellipsis whitespace-nowrap">
          {formatedTitle}
        </h3>

        <p className="text-md font-medium text-gray-400">2000 • Artist</p>
      </div>
    </Link>
  );
};

export default AudioCard;
