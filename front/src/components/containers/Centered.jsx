const Centered = ({ children }) => {
    return (
        <div className="flex flex-col bg-gray-800 p-5 lg:p-8 mb-2 items-center justify-center">
            {children}
        </div>
    )
}

export default Centered;