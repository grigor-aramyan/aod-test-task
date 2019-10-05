import {
    GET_REPORT_BY_ID
} from '../actions/types';

// Statics
import {
    ADMIN_TYPE
} from '../utils/statics';

const initialState = {
    currentReport: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_REPORT_BY_ID:
            return {
                ...state,
                currentReport: action.payload
            }
        default:
            return state;
    }
}