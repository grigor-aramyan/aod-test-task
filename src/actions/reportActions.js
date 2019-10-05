import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import { baseUri } from '../utils/statics';
import {
    GET_REPORT_BY_ID,
    CREATE_REPORT,
    UPDATE_REPORT,
    GET_REPORTS
} from './types';

const API_URI = baseUri + '/api/reports';

export const getAllReports = () => (dispatch, getState) => {
    axios.get(API_URI, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REPORTS,
                payload: res.data.reports
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

export const acceptRejectReport = (dataObject) => (dispatch, getState) => {
    axios.put(API_URI, dataObject, tokenConfig(getState))
        .then(res => {
            // TODO get updated data from sockets
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

export const createReport = (dataObject) => (dispatch, getState) => {
    axios.post(API_URI, dataObject, tokenConfig(getState))
        .then(res => {
            // TODO get updated data from sockets
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

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