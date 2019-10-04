import {
    GET_ALL_DEVS,
    GET_ALL_DEVS_AND_PMS,
    USER_CREATED_FROM_ADMIN,
    UPDATE_USER_ROLE
} from '../actions/types';

// Statics
import {
    ADMIN_TYPE
} from '../utils/statics';

const initialState = {
    allDevs: [],
    allDevsAndPms: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_ROLE:
            const updatedUser = action.paylod;

            const intermediateAllDevs = state.allDevs;
            let updatedAllDevs = null;
            if (updatedUser.userType === ADMIN_TYPE) {
                updatedAllDevs = state.allDevs;
            } else if (intermediateAllDevs.length > 0) {
                const filteredAllDevs = intermediateAllDevs.filter(d => {
                    return (d.id !== updatedUser.id);
                });
                filteredAllDevs.unshift(updatedUser);
                updatedAllDevs = filteredAllDevs;
            } else {
                updatedAllDevs = state.allDevs;
            }

            const intermediateAllDevsAndPms = state.allDevsAndPms;
            let updatedAllDevsAndPms = null;
            if (updatedUser.userType === ADMIN_TYPE) {
                updatedAllDevsAndPms = state.allDevsAndPms;
            } else if (intermediateAllDevsAndPms.length > 0) {
                const filteredAllDevs = intermediateAllDevsAndPms.filter(d => {
                    return (d.id !== updatedUser.id);
                });
                filteredAllDevs.unshift(updatedUser);
                updatedAllDevsAndPms = filteredAllDevs;
            } else {
                updatedAllDevsAndPms = state.allDevsAndPms;
            }

            return {
                ...state,
                allDevs: updatedAllDevs,
                allDevsAndPms: updatedAllDevsAndPms
            }
        case USER_CREATED_FROM_ADMIN:
            let updatedDevsAndPms = null;
            const newUser = action.payload.user;

            if (newUser.userType === ADMIN_TYPE) {
                updatedDevsAndPms = [...state.allDevsAndPms];
            } else {
                const intermediateArray = [...state.allDevsAndPms];
                intermediateArray.push(newUser);
                updatedDevsAndPms = intermediateArray;
            }

            return {
                ...state,
                allDevsAndPms: updatedDevsAndPms
            };
        case GET_ALL_DEVS:
            return {
                ...state,
                allDevs: action.payload
            };
        case GET_ALL_DEVS_AND_PMS:
            return {
                ...state,
                allDevsAndPms: action.payload
            };
        default:
            return state;
    }
}