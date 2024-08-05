
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FileInput from "../components/inputs/FileInput"
import { closeUploadModal } from '../store/UISlice'
import { API } from "../config";
import Modal from "./Modal";
import { FaUserGroup, FaTags } from "react-icons/fa6";
import ValidatedInput from "../components/inputs/ValidatedInput"
import { closeAddGroupModal } from "../store/UISlice";
import { validateText } from "../utils/validators";
import { useAddGroupMutation } from "../api/groupsAPI";


const AddGroupModal = () => {
    const isUploadModalOpen = useSelector((state) => state.UI.isAddGroupModalOpen);
    const [groupName, setGroupName] = useState('');
    const [isGroupNameValid, setIsGroupNameValid] = useState(null);

    const handleAddGroup = async (e) => {
        e.preventDefault();
        if (isGroupNameValid) {
            dispatch(useAddGroupMutation({ groupName }));
        } else {
            setErrorMessage('Check your inputs.')
        }
    }

    return (
        <Modal className={"max-w-md"} uiState={isUploadModalOpen} closeAction={closeAddGroupModal}>
            <div className="p-4 md:p-5">
                <FaUserGroup className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                </FaUserGroup>
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Create Group</h3>
                <br />
                <form onSubmit={handleAddGroup}>

                    <ValidatedInput
                        label='Group Name'
                        type='text'
                        placeholder='Enter group name...'
                        value={groupName}
                        setValue={setGroupName}
                        isValid={isGroupNameValid}
                        setIsValid={setIsGroupNameValid}
                        validator={validateText}
                    />
                    {/* <!-- Modal footer --> */}
                    <div className="flex items-center mt-6 space-x-4 rtl:space-x-reverse">
                        <button data-modal-hide="progress-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Group</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default AddGroupModal;