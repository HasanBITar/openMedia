import { extractFilename, formatBytes, formatDate, formatDuration } from "../../utils/helpers"

const Field = ({ name, desc }) => {
    return (
        <div className="my-3">
            <p className="text-bold text-md lg:text-lg">{name}</p>
            <p className="text-bold text-sm lg:text-md text-gray-300">{desc}</p>
        </div>
    );
};

const FileSidebar = ({ data }) => {
    console.log("fileSidebar", data);
    // return <></>
    return (
        <div className="p-3">
            <h2 className="flex font-bold text-xl lg:text-2xl text-white">File Info</h2>
            <Field name="File name" desc={extractFilename(data?.location)} />
            <Field name="Type" desc={data.type} />
            <Field name="Size" desc={formatBytes(data.size)} />
            <Field name="Date" desc={formatDate(data.date)} />
            {data.length !== undefined && <Field name="Length" desc={formatDuration(data.length)} />}
            {data.width !== undefined && <Field name="Width" desc={data.width} />}
            {data.height !== undefined && <Field name="Height" desc={data.height} />}
            {data.bitRate !== undefined && <Field name="BitRate" desc={data.bitRate} />}
            {data.bitDepth !== undefined && <Field name="BitDepth" desc={data.bitDepth} />}
            {data.artist !== undefined && <Field name="Artist" desc={data.artist} />}
            {data.album !== undefined && <Field name="Album" desc={data.album} />}
            {data.pages !== undefined && <Field name="Pages" desc={data.pages} />}

            <br></br>
            <br></br>

            <h2 className="flex font-bold text-xl lg:text-2xl text-white">File Tags</h2>
            <div className="flex">
                <Field desc="No tags available."/>
            </div>
        </div>
    )
}

/*
    {
    // "fileId": null,
    // "userId": "d49ea858-6066-47b8-acd5-21ec6234b4cd",
    // "location": "d49ea858-6066-47b8-acd5-21ec6234b4cd--1722784218364__output.mp4",
    // "type": "video",
    // "size": 35622609,
    // "createDate": "2024-08-04T15:10:19.461Z",
    // "thumbnail": "d49ea858-6066-47b8-acd5-21ec6234b4cd--1722784218364__output.jpg",
    "length": null,
    "width": null,
    "height": null,
    "bitRate": null,
    "bitDepth": null,
    "artist": null,
    "album": null,
    "pages": null
}
*/


export default FileSidebar;