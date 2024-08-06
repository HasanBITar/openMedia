import { useDispatch } from "react-redux";
import { openAddGroupModal } from "../../store/UISlice";
import AddGroupModal from "../../Modals/AddGroupModal";
import { useGetGroupsQuery, useDeleteGroupMutation } from "../../api/groupsAPI";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/helpers";
import { Link } from 'react-router-dom';
import ValidatedInput from "../inputs/ValidatedInput";
import { validateText } from "../../utils/validators";
import { HexColorPicker } from "react-colorful";
import { useAddTagMutation, useGetTagsQuery, useDeleteTagMutation } from "../../api/TagsAPI";

const Field = ({ id, color, name, date, action }) => {
    return (
        <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all ease-in-out">
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <Link to={id} className="w-full h-full">
                    <div className="ps-3">
                        <div className="text-base font-semibold">{name}</div>
                        {/* <div className="font-normal text-gray-500">neil.sims@flowbite.com</div> */}
                    </div>
                </Link>
            </th>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="p-2" style={{ backgroundColor: '#' + color, borderRadius: 9999 }} />
                </div>
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

const TagsSubPage = () => {
    const dispatch = useDispatch();

    const [isValid, setIsValid] = useState(null);
    const [newTag, setNewTag] = useState('');
    const [color, setColor] = useState("#b32aa9");
    const [colorHidden, setColorHidden] = useState(true);
    const colorStyle = {
        position: 'absolute',
        top: '-5rem',
        left: '-13rem',
    }

    const { data, error, isLoading, refetch } = useGetTagsQuery();
    const [addTag] = useAddTagMutation();
    const [deleteTag] = useDeleteTagMutation();

    useEffect(() => {
        console.log("tag data", data);
    }, [data, isLoading])

    const handleAddTag = async () => {
        await addTag({ color, name: newTag }).unwrap();
        refetch();
        setNewTag('');
    }

    const handleDeleteTag = async (tagId) => {
        await deleteTag(tagId).unwrap();
        refetch();
    }

    const renderContent = () => {
        if (isLoading) {
            return <tr><td colSpan={4}>Loading...</td></tr>;
        }

        if (error) {
            return <tr><td colSpan={4}>Error: {error.message}</td></tr>;
        }

        if (!data || data.length === 0) {
            return <tr><td colSpan={4} className="text-center">No Tags found.</td></tr>;
        }

        return (
            <>
                {data.map((item) => (
                    <Field
                        key={item.tagId}
                        id={item.tagId}
                        color={item.color}
                        name={item.name}
                        date={item.createDate}
                        action={handleDeleteTag} // Changed line
                    />
                ))}
            </>
        );
    };
    return (
        <>
            <div className="p-5 lg:p-8 relative overflow-x-auto shadow-md sm:rounded-lg transition-all ease-in-out">
                <div className="flex justify-start mb-3">
                    <div className="bg-gray-800">
                        <h1 className="flex font-bold text-md md:text-xl text-white text-center">Your Tags</h1>
                    </div>
                </div>
                <br></br>
                <div className="flex items-center justify-between overflow-visible ">
                    <ValidatedInput label='Tage Name' type='text' validator={validateText} value={newTag} setValue={setNewTag} isValid={isValid} setIsValid={setIsValid} />

                    <button onClick={() => setColorHidden(!colorHidden)}
                        className={`text-white relative bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                                text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-10 flex items-center`}
                    >
                        <div className={`p-2 rounded-full inline-block me-2`} style={{ backgroundColor: color }}></div>
                        Choose Color
                        <HexColorPicker color={color} onChange={setColor} style={colorHidden ? { display: 'none' } : colorStyle} />
                    </button>
                    <button onClick={handleAddTag}
                        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                            text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-10`}
                    > Create Tag
                    </button>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Tag
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
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
                        {renderContent(handleDeleteTag)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TagsSubPage;
