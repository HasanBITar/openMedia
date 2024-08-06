import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/helpers";
import { Link } from 'react-router-dom';
import { openPermission } from "../../store/UISlice";
import PermissionModal from "../../Modals/PermissionModal";
import { useGetPermissionsQuery, useDeletePermissionMutation } from "../../api/PermissionAPI";
import { extractFilename } from "../../utils/helpers";


const Field = ({ id, givenTo, accessOn, date, action }) => {
    return (
        <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all ease-in-out">
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="ps-3">
                    <div className="text-base font-semibold">{givenTo}</div>
                    {/* <div className="font-normal text-gray-500">neil.sims@flowbite.com</div> */}
                </div>
            </th>
            <td className="px-6 py-4">
                {accessOn}
            </td>
            <td className="px-6 py-4">
                {formatDate(date)}
            </td>
            <td className="px-6 py-4">
                <button onClick={() => action(id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
            </td>
        </tr >
    )
}

const Permissions = () => {
    const dispatch = useDispatch();

    const { data, error, isLoading, refetch } = useGetPermissionsQuery();
    const [deletePermission] = useDeletePermissionMutation();
    useEffect(() => {
        console.log("my permissions", data);
    }, [data, isLoading])


    const handleDeletePermission = async (permissionId) => {
        await deletePermission(permissionId).unwrap();
        refetch();
    }



    const renderContent = () => {
        if (isLoading) {
            return <tr><td className="text-center p-3" colSpan={4}>Loading...</td></tr>;
        }

        if (error) {
            return <tr><td className="text-center p-3" colSpan={4}>Error: {error.message}</td></tr>;
        }

        if (!data || data.length === 0) {
            return <tr><td className="text-center p-3" colSpan={4} >No Permissions found.</td></tr>;
        }

        return (
            <>
                {data.map((item) => (
                    <Field
                        key={item.permissionId}
                        id={item.permissionId}
                        givenTo={item.groupName !== null ? item.groupName + ' (Group)' : item.username}
                        accessOn={item.tagName !== null ? item.tagName + ' (Tag)' : extractFilename(item.location)}
                        date={item.createDate}
                        action={handleDeletePermission} // Changed line
                    />
                ))}
            </>
        );
    };

    const handleOpenPermission = () => {
        console.log('sdsds');
        dispatch(openPermission());
    }

    return (
        <>
            <PermissionModal />
            <div className="p-5 lg:p-8 relative overflow-x-auto shadow-md sm:rounded-lg transition-all ease-in-out">
                <div className="flex items-center justify-between overflow-visible ">
                    <div className="bg-gray-800">
                        <h1 className="flex font-bold text-md md:text-xl text-white text-center">Your Permissions</h1>
                    </div>
                    <button onClick={handleOpenPermission}
                        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                            text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-10`}
                    > Add Permission
                    </button>
                </div>
                <br></br>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Given to
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Access on
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderContent()}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Permissions;
