import React from 'react'
import User from '../../models/User'

export interface AuthState {
    accessToken: string | boolean,
    user: User | null

}

const initialAuth: AuthState = {
    accessToken: false,
    user: null
}

export const AuthContext = React.createContext(initialAuth)
AuthContext.displayName = 'authContext'
export const useAuth = () => React.useContext(AuthContext)

//TODO ver o melhor jeito de definir o estado inicial quando é uma funcao, mas nao queremos inicializar aqui.
export const AuthControlContext = React.createContext<null | Function>(null)
AuthContext.displayName = 'authControlContext'
export const useAuthControl = () => React.useContext(AuthControlContext)
