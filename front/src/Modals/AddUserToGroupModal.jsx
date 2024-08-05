import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { closeAddUserToGroupModal } from "../store/UISlice";
import { useAddUsersToGroupMutation } from "../api/groupsAPI";
import { FaUserGroup } from "react-icons/fa6";
import Modal from "./Modal";

import SearchDropdown from "../Dropdowns/SearchDropdown"

const AddUserToGroupModal = () => {
    

    const isOpen = useSelector((state) => state.UI.isAddUserToGroupModal);
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log(users);
    }, [users]);
    
    const [addUsers, { isLoading }] = useAddUsersToGroupMutation();

    const handleAddUsers = async (e) => {
        e.preventDefault();
        if (isGroupNameValid) {
            await addUsers({ name: groupName });
            window.location.reload();
            dispatch(closeAddUserToGroupModal());
        } else {
            alert('Check your inputs.');
        }
    };


    return (
        <Modal className={"max-w-md"} uiState={isOpen} closeAction={closeAddUserToGroupModal}>
            <div className="p-4 md:p-5">
                <FaUserGroup className="w-10 h-10 mb-2 text-gray-500" />
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Add Users</h3>
                <br />
                <form onSubmit={handleAddUsers}>
                    <SearchDropdown setValue={setUsers} hideChips={true} />
                    <div className="flex items-center justify-end mt-6 space-x-4 rtl:space-x-reverse">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {isLoading ? 'Adding...' : 'Add Users'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddUserToGroupModal;