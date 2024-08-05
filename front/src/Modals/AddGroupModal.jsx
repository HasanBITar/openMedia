import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeAddGroupModal } from "../store/UISlice";
import { validateText } from "../utils/validators";
import { useAddGroupMutation } from "../api/groupsAPI";
import Modal from "./Modal";
import { FaUserGroup } from "react-icons/fa6";
import ValidatedInput from "../components/inputs/ValidatedInput";
import { useNavigate } from "react-router-dom";

const AddGroupModal = () => {
    const isAddGroupModalOpen = useSelector((state) => state.UI.isAddGroupModalOpen);
    const dispatch = useDispatch();

    const [groupName, setGroupName] = useState('');
    const [isGroupNameValid, setIsGroupNameValid] = useState(null);
    const [addGroup, { isLoading }] = useAddGroupMutation();

    const handleAddGroup = async (e) => {
        e.preventDefault();
        if (isGroupNameValid) {
            await addGroup({ name: groupName });
            window.location.reload();
            const navigate = useNavigate();
            dispatch(closeAddGroupModal());
        } else {
            alert('Check your inputs.');
        }
    };

    return (
        <Modal className={"max-w-md"} uiState={isAddGroupModalOpen} closeAction={closeAddGroupModal}>
            <div className="p-4 md:p-5">
                <FaUserGroup className="w-10 h-10 mb-2 text-gray-500" />
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
                    <div className="flex items-center justify-end mt-6 space-x-4 rtl:space-x-reverse">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {isLoading ? 'Adding...' : 'Add Group'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddGroupModal;
