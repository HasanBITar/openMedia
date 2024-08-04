import { Link } from "react-router-dom";

const FeaturedLogo = () => {
    return (
        <div>
            <Link to="/" className="flex flex-col items-center justify-center py-4">
                <img src="./images/logo.svg" className="h-32 w-32 lg:h-40 lg:w-40 mb-4" alt="OpenMedia Logo" />
                <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">OpenMedia</span>
            </Link>
            <h2 className="text-xl font-medium text-gray-400">Your Media, Yours Anywhere.</h2>
        </div>
    )
}

export default FeaturedLogo;