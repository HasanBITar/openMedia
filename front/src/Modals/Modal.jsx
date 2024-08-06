
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Modal = ({ className, children, uiState, closeAction, beforeClose = ()=>{} }) => {
    const [isOpen, setIsOpen] = useState(uiState);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsOpen(uiState);
    }, [uiState])

    const closeModal = () => {
        beforeClose();
        dispatch(closeAction());
    }

    // TODO multiple files upload
    return (
        <div id="progress-modal" tabIndex="-1" className={`flex bg-semi-trans transition-all ease-in-out overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? "" : "hidden"}`}>
            <div className={`relative p-4 w-full max-h-full ${className}`}>
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                    <button type="button" onClick={closeModal} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="progress-modal">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    {children}
                    {/* <!-- Modal footer -->
                    <div className="flex items-center mt-6 space-x-4 rtl:space-x-reverse">
                    <button data-modal-hide="progress-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upgrade to PRO</button>
                    <button data-modal-hide="progress-modal" type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Modal;