import HomeSection from "../components/containers/HomeSection";
import VideoCard from "../components/cards/VideoCard";
import ImageCard from "../components/cards/ImageCard";
import AudioCard from "../components/cards/AudioCard";
import BookCard from "../components/cards/BookCard";
import VideoPlayListCard from "../components/cards/VideoPlayListCard";
import { useGetFilesQuery } from "../api/filesAPI";
import { API, fileTypes } from "../config";

const HomePage = () => {
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
  const page = 1;
  const { data, error, isLoading } = useGetFilesQuery({
    type: fileTypes.video,
    page,
  });

  const {
    data: imageData,
    error: imageError,
    isLoading: imageIsLoading,
  } = useGetFilesQuery({
    type: fileTypes.image,
    page,
  });

  const renderVideoContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!data || data.data.length === 0) {
      return <div>No videos found.</div>;
    }
    return (
      <>
        {data.data.map((item) => (
          <VideoCard
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
          />
        ))}
      </>
    );
  };
  const renderImageContent = () => {
    if (imageIsLoading) {
      return <div>Loading...</div>;
    }

    if (imageError) {
      return <div>Error: {error.message}</div>;
    }

    if (!imageData || imageData.data.length === 0) {
      return <div>No Images found.</div>;
    }

    return (
      <>
        {imageData.data.map((item) => (
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
    <>
      <HomeSection title={"Recent Videos"}>{renderVideoContent()}</HomeSection>

      {/* <hr className="my-7 border-t-2 border-gray-700" /> */}

      <HomeSection title={"Recent Music"}>
        {data2.map((item) => (
          <AudioCard
            key={item.video_id}
            id={item.video_id}
            thumbnail={item.thumbnail}
            title={item.fileName}
            type="PDF"
            createDate="12/10/2024"
            all={false}
          />
        ))}
      </HomeSection>

      {/* <hr className="my-7 border-t-2 border-gray-700" /> */}

      <HomeSection title={"Recent Photos"}>{renderImageContent()}</HomeSection>

      {/* <HomeSection title={"Recent Books"}>
        {data.map((item) => (
          <BookCard
            key={item.video_id}
            id={item.video_id}
            thumbnail={item.thumbnail}
            title={item.fileName}
            type="PDF"
            createDate="12/10/2024"
            all={false}
          />
        ))}
      </HomeSection> */}
    </>
  );
};

export default HomePage;
