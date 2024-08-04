const LibraryFeatured = ({ title, children }) => {
    return (
        <div className="flex flex-col m-auto rounded-md bg-gray-800">
            {/*  */}
            <div className="bg-gray-800 px-5 lg:px-8 sticky top-0 z-10 rounded-t-md shadow-lg">
                <h1 className="flex py-5 pt-5 lg:pt-8 font-bold text-2xl md:text-4xl text-white">{title}</h1>
            </div>
            <div className="p-5 pt-0 lg:p-8 lg:pt-0">{children}</div>
        </div>
    )
}

export default LibraryFeatured;