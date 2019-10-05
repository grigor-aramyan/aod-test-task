
import {
    GET_ALL_NOTIFS
} from '../actions/types';

// Statics
import {
    TASK_ASSIGNED_NOTIF,
    DEV_REPORTED_NOTIF,
    REPORT_ACCEPTED_NOTIF,
    REPORT_REJECTED_NOTIF
} from '../utils/statics';

const initialState = {
    allNotifs: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_NOTIFS:
            return {
                ...state,
                allNotifs: action.payload
            };
        default:
            return state;
    }
}