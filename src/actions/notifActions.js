import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import { baseUri } from '../utils/statics';
import {
    GET_ALL_NOTIFS
} from './types';

const API_URI = baseUri + '/api/notifs';

export const getAllNotifs = () => (dispatch, getState) => {
    axios.get(API_URI, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ALL_NOTIFS,
                payload: res.data.notifs
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}