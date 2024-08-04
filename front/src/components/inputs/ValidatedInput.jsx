
import { useEffect, useState } from "react";

const ValidatedInput = ({ label, type, placeholder, value, setValue, isValid, setIsValid, validator }) => {
    const [note, setNote] = useState('');

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         const [isNewValid, newNote] = validator(value);
    //         setIsValid(isNewValid);
    //         setNote(newNote);
    //     }, 500)

    //     return () => {
    //         clearTimeout(timer);
    //     }
    // }, [value])

    const handleValueChange = (e) => {
        console.log('value changed:', value);
        const newValue = e.target.value;
        setValue(newValue);
        const [isNewValid, newNote] = validator(newValue);
        setIsValid(isNewValid);
        setNote(newNote);
    }

    return (
        <div>
            <label className={`block mb-2 text-sm font-medium ${isValid === false ? 'text-red-700 dark:text-red-500' : 'text-white'}`}>
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={handleValueChange}
                onPaste={handleValueChange}
                className={`dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 border text-sm rounded-lg block w-full p-2.5
                    ${isValid === false ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                        : 'focus:ring-gray-400 focus:border-gray-400 text-gray-100'
                    }`}
                placeholder={placeholder}
                autoComplete="off"
            />
            {isValid === false && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500 h-5">
                    <span className="font-medium">Oops!</span> {note}
                </p>
            )}
            {isValid !== false && (
                <p className="mt-2 text-sm h-5">
                    <span className="font-medium"></span>
                </p>
            )}
        </div>
    );
};

export default ValidatedInput;
