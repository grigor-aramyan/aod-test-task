import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/App';
import DashboardView from './components/DashboardView';
import ReportsView from './components/ReportsView';
import UsersView from './components/UsersView';
import NotifsView from './components/NotifsView';

ReactDOM.hydrate(
    <Provider store={store}>
        <Router>
            <Route path='/'>
                <Switch>
                    <Route exact path='/' component={App} />
                    <Route path='/dashboard' component={DashboardView} />
                    <Route path='/reports' component={ReportsView} />
                    <Route path='/notifs' component={NotifsView} />
                    <Route path='/users' component={UsersView} />
                    <Route path='/*' render={ () => {
                        return(
                            <div>
                                Component not implemented yet!)
                            </div>
                        );
                    }} />
                </Switch>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);