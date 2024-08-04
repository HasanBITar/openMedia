import ImageCard from "../components/cards/ImageCard";
import HomeSection from "../components/containers/HomeSection";

function Images() {
  const AlbumData = [
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
  ];

  return (
    <div>
      <HomeSection title={"Albums"}>
        {AlbumData.map((item) => (
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
      <HomeSection title={"All Photos"}>
        {AlbumData.map((item) => (
          <ImageCard
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

export default Images;
