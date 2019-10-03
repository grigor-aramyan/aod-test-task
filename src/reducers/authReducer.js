import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOAD_LOCAL_TOKEN,
    USER_CREATED
} from '../actions/types';

const initialState = {
    token: '',
    isAuthenticated: null,
    isLoading: false,
    user: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('gl_token');
            
            return {
                ...state,
                token: '',
                isAuthenticated: null,
                isLoading: false,
                user: null
            };
        case USER_CREATED:
        case LOGIN_SUCCESS:
            localStorage.setItem('gl_token', action.payload.token);

            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false
            };
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case LOAD_LOCAL_TOKEN:
            return {
                ...state,
                token: action.payload.token
            };
        case USER_LOADED:

            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        default:
            return state;
    }
}