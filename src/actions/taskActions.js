import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import { baseUri } from '../utils/statics';
import {
    GET_TASK_BY_ID
} from './types';

const API_URI = baseUri + '/api/tasks';

export const getTaskById = (taskId) => (dispatch, getState) => {
    const uri = API_URI + `/${taskId}`;

    axios.get(uri, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TASK_BY_ID,
                payload: res.data.task
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}