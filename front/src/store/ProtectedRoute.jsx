import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { AUTH_STATUS, verifyToken } from './authSlice';
import LoadingPage from '../pages/LoadingPage';
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
    const authState = useSelector(state => state.auth);
    const [state, setState] = useState(authState.status);
    

    useEffect(() => {
        setState(authState.status);
    }, [authState.status]);

    if (state === AUTH_STATUS.loading) {
        return <LoadingPage />;
    }
    
    if (state === AUTH_STATUS.succeeded) {
        return <Outlet />;
    }

    return <Navigate to="/signin?err=unauthrized" />;
};

export default ProtectedRoute;
