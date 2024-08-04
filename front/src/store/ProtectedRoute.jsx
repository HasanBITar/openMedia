import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { AUTH_STATUS } from './authSlice';
import LoadingPage from '../pages/LoadingPage';
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
    const authState = useSelector(state => state.auth);
    const [state, setState] = useState(AUTH_STATUS.loading);
    useEffect(() => {
        setState(authState)
    }, [authState.status])

    if (state === AUTH_STATUS.loading) {
        console.log('hhhhhhhhhhhh');
        return <LoadingPage />;
    }
    else if (authState.user === null) {
        return <Navigate to="/signin?err=unauthrized" />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
