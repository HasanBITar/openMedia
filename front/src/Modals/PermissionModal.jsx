import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePermission } from "../store/UISlice";
import { useGetFilesQuery, useGetUsersQuery } from '../api/PermissionAPI'
import { useGetTagsQuery } from "../api/TagsAPI";
import { useGetGroupsQuery } from "../api/groupsAPI";
import { extractFilename } from "../utils/helpers";
import { useAddPermissionsMutation } from '../api/PermissionAPI';
import SearchDropdown from "../Dropdowns/SearchDropdown";

import Modal from "./Modal";

const PermissionModal = () => {
    const dispatch = useDispatch();
    const [addPerms, { isLoading }] = useAddPermissionsMutation();

    const isOpen = useSelector((state) => state.UI.isPermissionOpen);
    const pFileId = useSelector((state) => state.UI.permissionFileId);

    useEffect(() => {
        console.log('pm', isOpen);
    }, [isOpen])

    const [fileTagList, setFileTagList] = useState([]);
    const [userGroupList, setuserGroupList] = useState([]);

    const { data: files, error: error1, isLoading: isLoading1 } = useGetFilesQuery();
    const { data: tags, error: error2, isLoading: isLoading2 } = useGetTagsQuery();

    const { data: users, error: error3, isLoading: isLoading3 } = useGetUsersQuery();
    const { data: groups, error: error4, isLoading: isLoading4 } = useGetGroupsQuery();

    let fileTagOpts = null, userGroupOpts = null;
    useEffect(() => {
        console.log(files, tags, users, groups)
        if (!isLoading1 && !isLoading2 && !isLoading3 && !isLoading4) {
            // fileTagOpts = [
            //     ...files.map(i => {
            //         return {
            //             ...i,
            //             displayName: extractFilename(i.location)
            //         };
            //     }),
            //     ...tags.map(i => {
            //         return {
            //             ...i,
            //             displayName: i.name + ' - Tag'
            //         }
            //     })
            // ];

            // userGroupOpts = [
            //     ...users.map(i => {
            //         return {
            //             ...i,
            //             displayName: i.username
            //         }
            //     }),
            //     ...groups.map(i => {
            //         return {
            //             ...i,
            //             displayName: i.groupName + ' - Group'
            //         }
            //     })
            // ]
            // console.log(fileTagOpts, userGroupOpts);
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
        setFileTagList([])
        setuserGroupList([])
    }

    const handleAddPermissisons = async () => {
        await addPerms({fileTag: fileTagList, userGroup:userGroupList});
        window.location.reload();
        dispatch(closePermission);
    }

    return (
        // <Modal className={"max-w-md"} uiState={isUploadModalOpen} closeAction={closeUploadModal}></Modal>
        <Modal className={"max-w-2xl"} uiState={isOpen} closeAction={closePermission} beforeClose={handleClose}>
            <div className="p-4 md:p-5">

                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Add Permission</h3>
                <br />
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">What to Share</h3>
                {
                    isLoading1 || isLoading2 ?
                        <></>
                        :
                        <SearchDropdown
                            setValue={setFileTagList}
                            hideChips={false}
                            fieldName="displayName"
                            data={[
                                ...files.map(i => {
                                    return {
                                        ...i,
                                        displayName: extractFilename(i.location)
                                    };
                                }),
                                ...tags.map(i => {
                                    return {
                                        ...i,
                                        displayName: i.name + ' - Tag'
                                    }
                                })
                            ]}
                        />
                }
                <br />
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Who to Share With</h3>
                {
                    isLoading3 || isLoading4 ?
                        <></>
                        :
                        <SearchDropdown
                            setValue={setuserGroupList}
                            hideChips={false}
                            fieldName="displayName"
                            data={[
                                ...users.map(i => {
                                    return {
                                        ...i,
                                        displayName: i.username
                                    }
                                }),
                                ...groups.map(i => {
                                    return {
                                        ...i,
                                        displayName: i.groupName + ' - Group'
                                    }
                                })
                            ]}
                        />
                }
                <div className="flex items-center justify-end mt-6 space-x-4 rtl:space-x-reverse">
                    <button onClick={handleAddPermissisons}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {isLoading1 ? 'Adding...' : 'Add Permissions'}
                    </button>
                </div>
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