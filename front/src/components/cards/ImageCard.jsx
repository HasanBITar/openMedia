import { Link } from "react-router-dom";
import { formatString, formatDuration, formatDate } from "../../utils/helpers";


const ImageCard = ({ id, thumbnail, title, type, createDate }) => {
    const formatedTitle = formatString(title);
    const formatedDate = formatDate(createDate);
    return (
        <Link to={`/view/${id}`} className="snap-center md:snap-start scroll-mx-6 shrink-0 w-[80%] sm:w-56 md:w-52 lg:w-60">
            <div className="relative overflow-hidden rounded-md shadow-md bg-gray-800 shrink-0">
                {/* Thumbnail */}
                <div className="w-full h-0" style={{ paddingBottom: '100%' }}>
                    <img
                        src={thumbnail}
                        alt={formatedTitle}
                        className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 transform hover:scale-110"
                    />
                </div>
            </div>
            {/* Video Info */}
            <div className="mt-2 px-1">
                <h3 className="text-lg font-medium text-white">{formatedTitle}</h3>
                <p className="text-md font-medium text-gray-400">{formatedDate}</p>
            </div>
        </Link>
    );
};

export default ImageCard;