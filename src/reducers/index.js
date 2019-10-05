import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import notifReducer from './notifReducer';

export default combineReducers({
    auth: authReducer,
    users: userReducer,
    error: errorReducer,
    notifs: notifReducer
});