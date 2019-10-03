import {
    GET_ALL_DEVS,
    GET_ALL_DEVS_AND_PMS
} from '../actions/types';

const initialState = {
    allDevs: [],
    allDevsAndPms: []
};

export default function(state = initialState, action) {
    switch (action.type) {
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
            break;
    }
}