import { useState } from "react";

const Rating = ({ curRate, avg=4.95, fileId }) => {
    const [rate, setRate] = useState(curRate);
    const changeRate = (index) => {
        setRate(index);
    }
    /// TODO add api rate call
    return (
        <div className="flex items-end">
            {[1, 2, 3, 4, 5].map((index) => (
                <svg
                    key={index}
                    className={`w-5 h-5 ms-1 ${index <= rate ? 'text-yellow-300' : 'text-gray-300'}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                    onClick={() => changeRate(index)}
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            ))}
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{avg}</p>
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
        </div>
    )
}

export default Rating;