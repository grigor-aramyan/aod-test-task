import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import { baseUri } from '../utils/statics';
import {
    USER_CREATED
} from './types';

const API_URI = baseUri + '/api/users';

export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

export const createUser = ({ username, password, email, telephone, userType }) => (dispatch, getState) => {
    const body = { username, password, email, telephone, userType };

    axios.post(API_URI, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_CREATED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, CREATE_USER_ERROR));
        });
}