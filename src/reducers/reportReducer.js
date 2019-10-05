import {
    GET_REPORT_BY_ID,
    GET_REPORTS
} from '../actions/types';

// Statics
import {
    ADMIN_TYPE
} from '../utils/statics';

const initialState = {
    currentReport: null,
    allReports: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_REPORTS:
            return {
                ...state,
                allReports: action.payload
            };
        case GET_REPORT_BY_ID:
            return {
                ...state,
                currentReport: action.payload
            }
        default:
            return state;
    }
}