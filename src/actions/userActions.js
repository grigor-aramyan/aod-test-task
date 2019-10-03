import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import { baseUri } from '../utils/statics';
import {
    USER_CREATED,
    GET_ALL_DEVS,
    GET_ALL_DEVS_AND_PMS
} from './types';

const API_URI = baseUri + '/api/users';

export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const GET_ALL_DEVS_ERROR = 'GET_ALL_DEVS_ERROR';
export const GET_ALL_DEVS_AND_PMS_ERROR = 'GET_ALL_DEVS_AND_PMS_ERROR';

export const getAllDevsAndPms = () => {

    axios.get(API_URI, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ALL_DEVS_AND_PMS,
                payload: res.data.users
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, GET_ALL_DEVS_AND_PMS_ERROR));
        });
}

export const getAllDevs = () => {
    const uri = API_URI + '/devs';

    axios.get(uri, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ALL_DEVS,
                payload: res.data.devs
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, GET_ALL_DEVS_ERROR));
        });
}

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