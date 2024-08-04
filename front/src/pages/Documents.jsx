import BookCard from "../components/cards/BookCard";
import HomeSection from "../components/containers/HomeSection";

function Documents() {
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
    <div>
      <HomeSection title={"By Author"}>
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
      <HomeSection title={"By Genre"}>
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
      <HomeSection title={"All Books"}>
        {data.map((item) => (
          <BookCard
            key={item.video_id}
            id={item.video_id}
            thumbnail={item.thumbnail}
            title={item.fileName}
            type="PDF"
            createDate="12/10/2024"
            all={true}
          />
        ))}
      </HomeSection>
    </div>
  );
}

export default Documents;
