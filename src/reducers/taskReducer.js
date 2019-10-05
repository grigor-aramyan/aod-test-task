import {
    GET_TASK_BY_ID
} from '../actions/types';

// Statics
import {
    ADMIN_TYPE
} from '../utils/statics';

const initialState = {
    currentTask: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TASK_BY_ID:
            return {
                ...state,
                currentTask: action.payload
            }
        default:
            return state;
    }
}