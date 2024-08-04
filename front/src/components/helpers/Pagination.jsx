import React, { useEffect, useState } from 'react';

const Pagination = ({ totalItems, currentPage, onPageChange }) => {
    const itemsPerPage = 12;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxPageNumbers = 5;

    const [page, setPage] = useState(currentPage);

    // Calculate start and end page numbers
    let startPage, endPage;
    if (totalPages <= maxPageNumbers) {
        // Less than maxPageNumbers total pages, so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // More than maxPageNumbers total pages, so calculate start and end pages
        const maxPagesBeforeCurrentPage = Math.floor(maxPageNumbers / 2);
        const maxPagesAfterCurrentPage = Math.ceil(maxPageNumbers / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // Current page near the start
            startPage = 1;
            endPage = maxPageNumbers;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // Current page near the end
            startPage = totalPages - maxPageNumbers + 1;
            endPage = totalPages;
        } else {
            // Current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    const handlePageChange = (newPage) => {
        if (newPage < 0) return;
        if (newPage > totalPages) return;
        setPage(newPage);
        onPageChange(newPage);
    }

    useEffect(() => {
        console.log('state page ', page, page===1);
    }, [page]);

    // Create an array of pages to be displayed
    const pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    return (
        <div className="flex w-fit p-1 bg-gray-menu mx-auto rounded-md space-x-1">
            <div
                className={`flex items-center justify-center px-4 py-2 rounded cursor-pointer rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-600 ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
            >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>

            {pages.map(i =>
                <div
                    key={i}
                    className={`flex items-center justify-center px-4 py-2 mx-1 transition-colors duration-300 transform bg-white rounded sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white ${i === page ? 'dark:bg-blue-700 dark:text-blue-500' : 'dark:text-gray-200'}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </div>
            )}

            <div
                className={`flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
            >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );
};

export default Pagination;
