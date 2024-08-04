import { useEffect, useState } from "react";

import LibraryFeatured from "../containers/LibraryFeatured"
import VideoPlayListCard from "../cards/VideoPlayListCard";
import HomeSection from "../containers/HomeSection";
import VideoCard from "../cards/VideoCard";
import Pagination from "../helpers/Pagination";
import { useGetFilesQuery } from "../../api/filesAPI";
import { fileTypes, API } from "../../config";

const data2 = [
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

const VideoSubPage = () => {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useGetFilesQuery({ type: fileTypes.video, page });
    useEffect(() => {
        console.log(data);
    }, [isLoading])

    const handlePageChange = (newPage) => {
        console.log(newPage);
        setPage(newPage);
    }

    const renderContent = () => {
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
                        thumbnail={item.thumbnail ? API.thumbnail + item.thumbnail : '/images/thumb.jpeg'}
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

    return (
        <div className="relative">
            <HomeSection title={'Your Playlists'}>
                {data2.map((item) => (
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
            <LibraryFeatured title="Your Videos">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">

                    {renderContent()}

                </div>
            </LibraryFeatured>
            {!!data && data.data.length !== 0 && !error ?
                <Pagination
                    totalItems={data.total}
                    currentPage={data.page}
                    onPageChange={handlePageChange}
                /> :
                <Pagination
                    totalItems={0}
                    currentPage={1}
                    onPageChange={handlePageChange}
                />
            }

        </div>
    )
}

export default VideoSubPage;