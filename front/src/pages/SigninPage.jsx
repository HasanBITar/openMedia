import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import FeaturedLogo from "../components/navbar/FeaturedLogo";
import ValidatedInput from "../components/inputs/ValidatedInput";
import Button from "../components/buttons/Button";

import { login, AUTH_STATUS } from '../store/authSlice';
import { validateEmail, validatePassword } from "../utils/validators";

const SigninPage = () => {

    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(null);

    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (authState.status === AUTH_STATUS.succeeded) {
            navigate('/videos') // TODO Fix redirection on reload
        } else if (authState.status === AUTH_STATUS.failed) {
            setErrorMessage(authState.error || 'Login failed. Please try again.');
        }
    }, [authState.status, authState.error]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (isEmailValid && isPasswordValid) {
            dispatch(login({ email, password }));
        } else {
            setErrorMessage('Check your inputs.')
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-20 w-full dark:bg-gray-900
            lg:items-center lg:justify-around lg:flex-row lg:space-y-0"
        >
            <FeaturedLogo />
            <div className="w-full md:max-w-xl sm:max-w-md max-w-sm p-6 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800">
                <form className="space-y-3" onSubmit={handleFormSubmit}>
                    <h4 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">Sign in to your account</h4>

                    <ValidatedInput
                        label="Your email"
                        placeholder="name@example.com"
                        type="email"
                        value={email}
                        setValue={setEmail}
                        isValid={isEmailValid}
                        setIsValid={setIsEmailValid}
                        validator={validateEmail}
                    />
                    <ValidatedInput
                        label="Your password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        setValue={setPassword}
                        isValid={isPasswordValid}
                        setIsValid={setIsPasswordValid}
                        validator={validatePassword}
                    />

                    <Button
                        className="w-full"
                        isLoading={authState.status === AUTH_STATUS.loading}
                    >
                        Login to your account
                    </Button>

                    <p className="text-sm text-red-600 dark:text-red-500 h-5 text-center">
                        {errorMessage && (
                            <><span className="font-medium">Oops! </span>{errorMessage} </>
                        )}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                        </div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            <Link to="/reset-password" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default SigninPage;
