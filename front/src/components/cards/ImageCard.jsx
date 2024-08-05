import { Link } from "react-router-dom";
import { formatString, formatDuration, formatDate, extractFilename } from "../../utils/helpers";


const ImageCard = ({ id, thumbnail, title, type, createDate,scroll=true }) => {
    const formatedTitle = formatString(title);
    const formatedDate = formatDate(createDate);
    title = extractFilename(title,true);
    return (
        <Link to={`/view/${id}`} className={scroll? "snap-center md:snap-start scroll-mx-6 shrink-0 w-[80%] sm:w-72 md:w-80 lg:w-96": ""}>
            <div className="relative overflow-hidden rounded-xl shadow-md bg-gray-800 shrink-0">
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
                <h3 className="text-lg font-medium text-white">{title}</h3>
                <p className="text-md font-medium text-gray-400">{formatedDate}</p>
            </div>
        </Link>
    );
};

export default ImageCard;