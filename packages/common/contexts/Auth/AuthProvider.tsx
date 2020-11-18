import React, { FunctionComponent, useState } from 'react';
import User from '../../models/User';
import { AuthContext, AuthControlContext, AuthState } from './AuthContext';



interface Props {
    children: React.ReactNode
}

export const AuthProvider: FunctionComponent<Props> = (props) => {

    const [authState, setAuthState] = useState<AuthState>({ accessToken: '', user: null })

    const setToken = (accessToken: string, user: User) => setAuthState({ ...authState, accessToken, user })

    return (
        <AuthContext.Provider value={authState}>
            <AuthControlContext.Provider value={setToken}>
                {props.children}
            </AuthControlContext.Provider>
        </AuthContext.Provider>
    )
}