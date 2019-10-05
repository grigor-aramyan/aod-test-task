import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import { baseUri } from '../utils/statics';
import {
    GET_REPORT_BY_ID
} from './types';

const API_URI = baseUri + '/api/reports';

export const getReportById = (reportId) => (dispatch, getState) => {
    const uri = API_URI + `/${reportId}`;

    axios.get(uri, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REPORT_BY_ID,
                payload: res.data.report
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}