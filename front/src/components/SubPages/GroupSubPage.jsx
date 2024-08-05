
import { useDispatch } from "react-redux";
import { openAddGroupModal } from "../../store/UISlice";
import AddGroupModal from "../../Modals/AddGroupModal";
import { useGetGroupsQuery } from "../../api/groupsAPI";
import { useEffect } from "react";

const Field = ({ id, name, count, date, action }) => {
    return (
        <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all ease-in-out">
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="ps-3">
                    <div className="text-base font-semibold">{name}</div>
                    {/* <div className="font-normal text-gray-500">neil.sims@flowbite.com</div> */}
                </div>
            </th>
            <td className="px-6 py-4">
                {count}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    date
                </div>
            </td>
            <td className="px-6 py-4">
                <button onClick={action(id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
            </td>
        </tr>
    )
}

const GroupSubPage = () => {
    const dispatch = useDispatch();
    const openAddGroupModal = () => {
        dispatch(openAddGroupModal())
    }

    const { data, error, isLoading } = useGetGroupsQuery();

    useEffect(() => {
        console.log(data);
    }, [isLoading])

    const renderContent = () => {
        if (isLoading) {
            return <tr><td colSpan={4}>Loading...</td></tr>;
        }

        if (error) {
            return <tr><td colSpan={4}>Error: {error.message}</td></tr>;
        }

        if (!data || data.data.length === 0) {
            return <tr><td colSpan={4}>No videos found.</td></tr>;
        }

        return (
            <>
                {data.data.map((item) => (
                    <Field
                        // id={item.id}
                        // name={}
                        // count={}
                        // date={}
                        // action={}
                    />
                ))}
            </>
        );
    };

    return (
        <>
            <AddGroupModal />
            <div className="p-5 lg:p-8 relative overflow-x-auto shadow-md sm:rounded-lg transition-all ease-in-out">
                <div className="flex justify-end mb-3">
                    <button onClick={openAddGroupModal}
                        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                        text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    > Create Group
                    </button>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Group
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Users
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
                        {renderContent}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default GroupSubPage;