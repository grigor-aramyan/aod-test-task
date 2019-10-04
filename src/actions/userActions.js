import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import { baseUri } from '../utils/statics';
import {
    USER_CREATED,
    USER_CREATED_FROM_ADMIN,
    GET_ALL_DEVS,
    GET_ALL_DEVS_AND_PMS,
    UPDATE_USER_ROLE
} from './types';

const API_URI = baseUri + '/api/users';

export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const CREATE_USER_FROM_ADMIN_ERROR = 'CREATE_USER_FROM_ADMIN_ERROR';
export const GET_ALL_DEVS_ERROR = 'GET_ALL_DEVS_ERROR';
export const GET_ALL_DEVS_AND_PMS_ERROR = 'GET_ALL_DEVS_AND_PMS_ERROR';

export const updateUserRole = (dataObject) => (dispatch, getState) => {
    const uri = API_URI + '/role';

    axios.put(uri, dataObject, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_USER_ROLE,
                payload: res.data.user
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

export const assignTask = (dataObject) => (dispatch, getState) => {
    const uri = API_URI + '/task';

    axios.post(uri, dataObject, tokenConfig(getState))
        .then(res => {
            // TODO send back new task data and utilize in some section
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

export const getAllDevsAndPms = () => (dispatch, getState) => {

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

export const getAllDevs = () => (dispatch, getState) => {
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

export const addNewUserAsAdmin = ({ username, password, email, telephone, userType }) => (dispatch, getState) => {
    const body = { username, password, email, telephone, userType };

    axios.post(API_URI, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_CREATED_FROM_ADMIN,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, CREATE_USER_FROM_ADMIN_ERROR));
        });
}