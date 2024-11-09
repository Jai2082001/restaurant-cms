import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'
import { checkAuthStatus } from "../../store/slices/userSlices";

const ProtectedRoutes = ({ Component }) => {

    const { isAuthenticated, status } = useSelector((state) =>  state.auth );
    console.log(isAuthenticated)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch])


    if (status === 'loading' || status === 'idle') {
        return <p>Loading...</p>;
    }

    return (
        <>
            {isAuthenticated ? Component : <Navigate to='/account' replace />}
        </>
    );
    
}


export default ProtectedRoutes
