const NavSearch = ({ className, value, onChange }) => {
    return (
        <div className={"relative min-w-72 " + className}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search icon</span>
            </div>
            <input
                value={value}
                onChange={onChange}
                type="text" id="search-navbar" className="block w-full ps-10 text-sm rounded-md lg:py-3 p-2 lg:dark:bg-gray-800 dark:bg-gray-input border-none
                 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search..." />
        </div>
    )
}

export default NavSearch;