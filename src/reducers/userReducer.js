import {
    GET_ALL_DEVS,
    GET_ALL_DEVS_AND_PMS,
    USER_CREATED_FROM_ADMIN
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