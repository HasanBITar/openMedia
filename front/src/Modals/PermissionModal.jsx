import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePermission } from "../store/UISlice";
import { useGetFilesQuery, useGetUsersQuery } from '../api/PermissionAPI'
import { useGetTagsQuery } from "../api/TagsAPI";
import { useGetGroupsQuery } from "../api/groupsAPI";
import { extractFilename } from "../utils/helpers";
import SearchDropdown from "../Dropdowns/SearchDropdown";

import Modal from "./Modal";

const PermissionModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.UI.isPermissionOpen);
    const pFileId = useSelector((state) => state.UI.permissionFileId);


    const [fileTagList, setFileTagList] = useState([]);
    const [userGroupList, setuserGroupList] = useState([]);

    const files = useGetFilesQuery();
    const tags = useGetTagsQuery();

    const users = useGetUsersQuery();
    const groups = useGetGroupsQuery();

    let fileTagOpts = null, userGroupOpts = null;
    useEffect(() => {
        console.log(files, tags, users, groups)
        if (files.isSuccess && tags.isSuccess && users.isSuccess && groups.isSuccess) {
            fileTagOpts = [
                ...files.data.map(i => {
                    return {
                        ...i,
                        displayName: extractFilename(i.location)
                    };
                }),
                ...tags.data.map(i => {
                    return {
                        ...i,
                        displayName: i.name + ' - Tag'
                    }
                })
            ];

            userGroupOpts = [
                ...users.data.map(i => {
                    return {
                        ...i,
                        displayName: i.username
                    }
                }),
                ...groups.data.map(i => {
                    return {
                        ...i,
                        displayName: i.groupName + ' - Group'
                    }
                })
            ]
            console.log(fileTagOpts, userGroupOpts);
        }
    }, [files, tags, users, groups])

    // const handleAddGroup = async (e) => {
    //     e.preventDefault();
    //     if (isGroupNameValid) {
    //         await addGroup({ name: groupName });
    //         window.location.reload();
    //         const navigate = useNavigate();
    //         dispatch(closeAddGroupModal());
    //     } else {
    //         alert('Check your inputs.');
    //     }
    // };

    const handleClose = () => {

    }

    return (
        <Modal className={"max-w-xl"} uiState={isOpen} closeAction={handleClose}>
            <div className="p-4 md:p-5">

                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Add Permission</h3>
                <br />
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">What to Share</h3>
                <SearchDropdown
                    data={fileTagOpts}
                    setValue={setFileTagList}
                    hideChips={false}
                    fieldName="displayName"
                />
                <br />
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Who to Share With</h3>
                <SearchDropdown
                    data={fileTagOpts}
                    setValue={setFileTagList}
                    hideChips={false}
                    fieldName="displayName"
                />
            </div>
        </Modal>
    );
};

export default PermissionModal;



// {
//     "groupId": "c37f7c18-2610-41ed-8155-614c8f2dfd52",
//     "groupName": "Collage ",
//     "createDate": "2024-08-05T20:42:11.491Z",
//     "createdBy": "c3c910bb-bf20-4b7c-b76c-0a91e0ac062a"
// }

// {
//     "user_id": "8cc08159-6b7f-4b7d-9aab-7994032482c2",
//     "username": "random",
//     "email": "random@email.com",
//     "password": "$2a$10$alW6DltVzfiAsGuNm1iRX./FNMzfIBk9fQyQUbnI98JZSNN86wkny",
//     "profile_photo": null,
//     "is_admin": false
// }

// {
//     "tagId": "61ad54b2-7daf-4350-8298-9af119901801",
//     "userId": "c3c910bb-bf20-4b7c-b76c-0a91e0ac062a",
//     "name": "tag2",
//     "color": "b32aa9",
//     "createDate": "2024-08-06T00:02:18.611Z"
// }

// {
//     "fileId": "7cf83a59-77ad-497d-bd84-58ae635e37cd",
//     "userId": "c3c910bb-bf20-4b7c-b76c-0a91e0ac062a",
//     "location": "c3c910bb-bf20-4b7c-b76c-0a91e0ac062a--1722907976399__2K Video Demo [hddwAIXbKZo].mp4",
//     "type": "video",
//     "size": 5556147,
//     "createDate": "2024-08-06T01:32:57.571Z",
//     "thumbnail": "c3c910bb-bf20-4b7c-b76c-0a91e0ac062a--1722907976399__2K Video Demo [hddwAIXbKZo].jpg"
// }