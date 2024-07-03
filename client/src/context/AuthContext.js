import { createContext, useContext, useReducer, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Define action types
export const LOGIN_BEGINS = 'LOGIN_BEGINS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

// Initial state
export const initialState = {
   user: null,
   token: '',
   loading: false,
   error: null
}

// Reducer function
export const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_BEGINS:
            return {
               ...state,
               loading: true
            };
        case LOGIN_SUCCESS:
            return {
               ...state,
               loading: false,
               user: action.payload.user,
               token: action.payload.token
            };
        case LOGIN_FAIL:
            return {
               ...state,
               loading: false,
               error: action.payload
            };
        case LOGOUT:
            return {
               ...state,
               user: null,
               token: ''
            };
        default:
            return state;
    }
};

// Create context
const AuthContext = createContext();

// AuthProvider component
export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            dispatch({ type: LOGIN_SUCCESS, payload: { user: decodedToken.user, token } });
        }
    }, []);
    

    return (
        <AuthContext.Provider value={{ authState: state, authDispatch: dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use auth context
export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;
