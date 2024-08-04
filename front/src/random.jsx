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

import VideoCard from "./components/cards/VideoCard";
const Random = () => {
    return (
        <div className="not-prose relative rounded-md overflow-hidden bg-gray-800 p-2 md:p-5 lg:p-8 mb-3">
            <div className="relative overflow-auto">
                <div className="relative w-full flex gap-4 md:gap-6 snap-x snap-mandatory overflow-x-auto hide-scroll-bar">

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

                </div>
            </div>
        </div>
    )
}





export default Random;
