const SubButton = ({ className, onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-between text-gray-200 bg-[#3b3b3b] hover:bg-[#4f4f4f]
             px-3 py-2 rounded-full transition-all ease-in-out ${className}`}>
            {children}
        </button>
    )
}

export default SubButton;