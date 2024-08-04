import HomeSection from "../components/containers/HomeSection";
import VideoCard from "../components/cards/VideoCard";
import ImageCard from "../components/cards/ImageCard";
import AudioCard from "../components/cards/AudioCard";
import BookCard from "../components/cards/BookCard";
import VideoPlayListCard from "../components/cards/VideoPlayListCard";

const HomePage = () => {
  const data = [
    {
      video_id: "svd329esvdsdv1",
      thumbnail: "images/thumb.jpeg",
      fileName:
        "random video sdvksdv sdvksdv sdv kblos osiw isvd svvsd iwev svdisdv sjv jsdvdj sdvj jsvd jwro q;b wo wjv wvh",
      duration: 1000,
      durationWatched: 20,
      createDate: "12/10/2024",
    },
    {
      video_id: "svd329esvdsdv2",
      thumbnail: "/images/thumb.jpeg",
      fileName: "random video",
      duration: 1000,
      durationWatched: 400,
      createDate: "12/10/2024",
    },
    {
      video_id: "svd329esvdsdv3",
      thumbnail: "/images/thumb.jpeg",
      fileName: "random video",
      duration: 1000,
      durationWatched: 0,
      createDate: "12/10/2024",
    },
    {
      video_id: "svd329esvdsdv4",
      thumbnail: "/images/thumb.jpeg",
      fileName: "random video",
      duration: 1000,
      durationWatched: 400,
      createDate: "12/10/2024",
    },
    {
      video_id: "svd329esvdsdv5",
      thumbnail: "/images/thumb.jpeg",
      fileName: "random video",
      duration: 1000,
      durationWatched: 400,
      createDate: "12/10/2024",
    },
  ];
  return (
    <>
      <HomeSection title={"Recent Videos"}>
        {data.map((item) => (
          <VideoCard
            key={item.video_id}
            id={item.video_id}
            thumbnail={item.thumbnail}
            title={item.fileName}
            duration={item.duration}
            durationWatched={item.durationWatched}
            createDate={item.createDate}
            all={false}
          />
        ))}
      </HomeSection>

      {/* <hr className="my-7 border-t-2 border-gray-700" /> */}

      <HomeSection title={"Recent Music"}>
        {data.map((item) => (
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

      <HomeSection title={"Recent Photos"}>
        {data.map((item) => (
          <ImageCard
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

      <HomeSection title={"Recent Books"}>
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
      </HomeSection>
    </>
  );
};

export default HomePage;
