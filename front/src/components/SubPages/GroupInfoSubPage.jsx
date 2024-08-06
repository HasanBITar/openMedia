import { useDispatch } from "react-redux";
import { openAddUserToGroupModal } from "../../store/UISlice";
import AddUserToGroupModal from "../../Modals/AddUserToGroupModal";
import { useGetGroupInfoQuery, useDeleteUserFromGroupMutation } from "../../api/groupsAPI";
import { useEffect } from "react";
import { formatDate } from "../../utils/helpers";
import { Link } from 'react-router-dom'

const Field = ({ id, name, email, action }) => {
    return (
        <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all ease-in-out">
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="ps-3">
                    <Link to={id}>
                        <div className="text-base font-semibold">{name}</div>
                    </Link>
                    <div className="font-normal text-gray-500">{email}</div>
                </div>
            </th>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    {email}
                </div>
            </td>
            <td className="px-6 py-4">
                <button onClick={() => action(id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
            </td>
        </tr >
    )
}

const GroupInfoSubPage = ({ groupId }) => {
    console.log('info group', groupId)
    const dispatch = useDispatch();
    const openModalHandler = () => {
        console.log("sdsdvsdv")
        dispatch(openAddUserToGroupModal())
    }

    const { data, error, isLoading, refetch } = useGetGroupInfoQuery(groupId);

    useEffect(() => {
        console.log("group data", data);
    }, [data, isLoading])

    const renderContent = () => {
        if (isLoading) {
            return <tr><td colSpan={4}>Loading...</td></tr>;
        }

        if (error) {
            return <tr><td colSpan={4}>Error: {error.message}</td></tr>;
        }

        if (!data || data.length === 0) {
            return <tr><td colSpan={4} className="text-center py-3">No users found.</td></tr>;
        }

        return (
            <>
                {data.map((item) => (
                    <Field
                        key={item.userId}
                        id={item.userId}
                        name={item.username}
                        email={item.email}
                        action={handleDeleteUser} // Replace with actual delete action
                    />
                ))}
            </>
        );
    };
    
    const [deleteUser] = useDeleteUserFromGroupMutation();
    const handleDeleteUser = async (userId) => {
        await deleteUser({groupId, userId}).unwrap();
        refetch()
    }

    return (
        <>
            <AddUserToGroupModal groupId={groupId} />
            <div className="p-5 lg:p-8 relative overflow-x-auto shadow-md sm:rounded-lg transition-all ease-in-out">
                <div className="flex justify-between mb-3">
                    <div className="bg-gray-800">
                        <h1 className="flex font-bold text-md md:text-xl text-white">Group Info</h1>
                    </div>
                    <button onClick={openModalHandler}
                        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                        text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    > Add Users
                    </button>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Email
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

export default GroupInfoSubPage;
