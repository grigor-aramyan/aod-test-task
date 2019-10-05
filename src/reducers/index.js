import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import notifReducer from './notifReducer';
import reportReducer from './reportReducer';
import taskReducer from './taskReducer';

export default combineReducers({
    auth: authReducer,
    users: userReducer,
    error: errorReducer,
    notifs: notifReducer,
    reports: reportReducer,
    tasks: taskReducer
});