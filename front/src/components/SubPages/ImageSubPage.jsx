import LibraryFeatured from "../containers/LibraryFeatured";
import VideoPlayListCard from "../cards/VideoPlayListCard";
import HomeSection from "../containers/HomeSection";
import VideoCard from "../cards/VideoCard";
import ImageCard from "../cards/ImageCard";
import Pagination from "../helpers/Pagination";
import { useGetFilesQuery } from "../../api/filesAPI";
import { fileTypes, API } from "../../config";
import { useEffect, useState } from "react";
const data2 = [
  {
    video_id: "svd329esvdsdv1",
    thumbnail: "images/thumb5.jpeg",
    fileName: " Graduation",
    duration: 1000,
    durationWatched: 20,
    createDate: "2024-08-05T10:57:09.979Z",
  },
  {
    video_id: "svd329esvdsdv2",
    thumbnail: "/images/thumb1.jpeg",
    fileName: " Norway",
    duration: 1000,
    durationWatched: 400,
    createDate: "2024-08-05T10:57:09.979Z",
  },
  {
    video_id: "svd329esvdsdv3",
    thumbnail: "/images/thumb2.jpeg",
    fileName: " Medow",
    duration: 1000,
    durationWatched: 0,
    createDate: "2024-08-05T10:57:09.979Z",
  },
  {
    video_id: "svd329esvdsdv4",
    thumbnail: "/images/thumb3.jpeg",
    fileName: " Laptop",
    duration: 1000,
    durationWatched: 400,
    createDate: "2024-08-05T10:57:09.979Z",
  },
  {
    video_id: "svd329esvdsdv5",
    thumbnail: "/images/thumb4.jpeg",
    fileName: " Cliff",
    duration: 1000,
    durationWatched: 400,
    createDate: "2024-08-05T10:57:09.979Z",
  },
];
const ImageSubPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetFilesQuery({
    type: fileTypes.image,
    page,
  });

  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!data || data.data.length === 0) {
      return <div>No Images found.</div>;
    }
    console.log(data.data[0].createDate);

    return (
      <>
        {data.data.map((item) => (
          <ImageCard
            key={item.fileId}
            id={item.fileId}
            thumbnail={
              item.thumbnail
                ? API.thumbnail + item.thumbnail
                : "/images/thumb.jpeg"
            }
            title={item.location}
            duration={item.length}
            durationWatched={item.durationWatched | 0}
            createDate={item.createDate}
            scroll={false}
            album={false}
          />
        ))}
      </>
    );
  };

  return (
    <div className="relative">
      <HomeSection title={"Your Albums"}>
        {data2.map((item) => (
          <ImageCard
            key={item.video_id}
            id={item.video_id}
            thumbnail={item.thumbnail}
            title={item.fileName}
            duration={item.duration}
            durationWatched={item.durationWatched}
            createDate={item.createDate}
            all={false}
            album={true}
          />
        ))}
      </HomeSection>
      <LibraryFeatured title="Your Images">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
          {renderContent()}
        </div>
      </LibraryFeatured>
      {!!data && data.data.length !== 0 && !error ? (
        <Pagination
          totalItems={data.total}
          currentPage={data.page}
          onPageChange={handlePageChange}
        />
      ) : (
        <Pagination
          totalItems={0}
          currentPage={1}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ImageSubPage;
