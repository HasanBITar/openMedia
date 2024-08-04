import { formatDate } from '../../utils/helpers'
const Comment = ({ username, date, content, id }) => {
    return (
        <div key={id}>
            <div className="flex flex-col gap-3 py-4 md:py-8">
                <div>
                    <span className="block text-md font-bold text-white">{username}</span>
                    <span className="block text-sm text-gray-300">{formatDate(date)}</span>
                </div>
                <p className="text-gray-200">{content}</p>
            </div>
            <hr className='border border-gray-700'></hr>
        </div>
    )
}

export default Comment;