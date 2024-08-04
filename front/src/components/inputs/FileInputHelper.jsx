import React, { useState } from 'react';
import UploadButton from '@rpldy/upload-button';
import { useItemFinishListener, useItemProgressListener } from '@rpldy/uploady';

const FileInputHelper = ({ label, className, setValue }) => {
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState(null);
    useItemFinishListener((item) => {
        if (item.uploadResponse && item.uploadResponse.data) {
            setFileName(item.file.name);
            setValue(item.uploadResponse.data);
        }
    });

    useItemProgressListener((item) => {
        setProgress(Math.round(item.completed));
    });

    return (
        <div className={className}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <div className="flex w-full text-sm border rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-0">

                <UploadButton className="bg-gray-800 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg rounded-tr-none rounded-br-none" extraProps={{ 'type': 'button' }}>
                    Choose File
                </UploadButton>
                <div className="flex-1 flex items-end px-4 relative" >
                    <div className='absolute bottom-2 overflow-hidden text-nowrap max-w-[90%]'>
                        <p>
                            {
                                fileName && progress===100 ? `Uploaded: ${fileName}` :
                                    progress ? `Uploading ${progress}%` :
                                        'No file chosen'
                            }
                        </p>
                    </div>
                    <div className="flex-1 w-10/12 bg-gray-600 rounded-full h-1 dark:bg-gray-700">
                        <div
                            className="bg-blue-500 h-1 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileInputHelper;