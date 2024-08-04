const CommentInput = () => {
    return (<>

        <form>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-input">
                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-transparent focus:outline-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t bg-gray-input rounded-b-md dark:border-gray-input">
                    <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Post comment
                    </button>
                </div>
            </div>
        </form>
        <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our community guidelines</p>
    </>
    )
}

export default CommentInput;