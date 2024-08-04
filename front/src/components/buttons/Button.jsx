import { useEffect, useState } from "react";
// TODO fix loading and disabling button
const Button = ({ children, className, isLoading, isDisabled = false }) => {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(isLoading){
            setDisabled(isDisabled);
            setLoading(isLoading);
        }
        else {
            setDisabled(isDisabled)
        }
    }, [isDisabled, isLoading])
    return (
        <button
            type="submit"
            className={`${className} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            // disabled={disabled && "disabled"}
        >
            {children} 
            {/* {loading && "..."} */}
        </button>
    )
}

export default Button;