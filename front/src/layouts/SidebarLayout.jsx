const SidebarLayout = ({ sidebar: SidebarComponent, children }) => {
    return (
        <>
            <aside id="sidebar-multi-level-sidebar" className="fixed flex top-0 left-0 z-40 w-72 lg:w-80 xl:w-96 h-screen transition-transform -translate-x-full md:translate-x-0" aria-label="Sidebar">
                <div className="flex-1 m-3 mt-16 overflow-y-auto rounded-lg lg:rounded-xl bg-gray-800 p-2 lg:p-4">
                    <SidebarComponent />
                </div>
            </aside>

            <div className="md:ml-[17.25rem] lg:ml-[19.25rem] xl:ml-[23.25rem]">
                <div className="not-prose relative rounded-lg lg:rounded-xl overflow-hidden dark:bg-gray-800">
                    <div className="absolute inset-0"></div>
                    <div className="relative rounded-lg lg:rounded-xl overflow-auto">
                        <div className="overscroll-contain overflow-auto h-subpage mb-3 hide-scroll-bar">
                            {children}
                        </div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none rounded-md"></div>
                </div>
            </div>
        </>
    )
}

export default SidebarLayout;
