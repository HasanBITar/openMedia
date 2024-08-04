import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="./images/logo.svg" className="h-9 w-9" alt="OpenMedia Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">OpenMedia</span>
        </Link>
    )
}

export default Logo;