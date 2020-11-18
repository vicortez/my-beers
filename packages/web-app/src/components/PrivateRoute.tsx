import React from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { useAuth } from 'common/contexts/Auth';

const isAuthenticated = false

export const PrivateRoute = (props: any) => {
    // const navigate = useNavigate()
    const authState = useAuth()
    if (!authState.accessToken) return <Navigate to='/login' />
    return (
        <Route {...props} />
    )
}
