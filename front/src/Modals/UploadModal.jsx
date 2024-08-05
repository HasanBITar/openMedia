
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FileInput from "../components/inputs/FileInput"
import { closeUploadModal } from '../store/UISlice'
import { API } from "../config";
import Modal from "./Modal";


const UploadModal = () => {
    const dispatch = useDispatch();
    const isUploadModalOpen = useSelector((state) => state.UI.isUploadModalOpen);
    
    const [fileInfo, setFileInfo] = useState(null);
    useEffect(() => {
        dispatch(closeUploadModal());
    }, [fileInfo])

    // TODO multiple files upload
    return (
        <Modal className={"max-w-md"} uiState={isUploadModalOpen} closeAction={closeUploadModal}>
            <div className="p-4 md:p-5">
                <svg className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M8 5.625c4.418 0 8-1.063 8-2.375S12.418.875 8 .875 0 1.938 0 3.25s3.582 2.375 8 2.375Zm0 13.5c4.963 0 8-1.538 8-2.375v-4.019c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353c-.193.081-.394.158-.6.231l-.189.067c-2.04.628-4.165.936-6.3.911a20.601 20.601 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244c-.053-.028-.113-.053-.165-.082v4.019C0 17.587 3.037 19.125 8 19.125Zm7.09-12.709c-.193.081-.394.158-.6.231l-.189.067a20.6 20.6 0 0 1-6.3.911 20.6 20.6 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244C.112 6.035.052 6.01 0 5.981V10c0 .837 3.037 2.375 8 2.375s8-1.538 8-2.375V5.981c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353Z" />
                </svg>
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Upload Your Media</h3>
                <br />
                <FileInput className="pb-8" label="Choose File" multiple={false} types=".jpg,.png,.mp4,.mkv,.pdf,.mp3,.flac" setValue={setFileInfo} api={API.upload} />
            </div>
        </Modal>
    );
}

export default UploadModal;