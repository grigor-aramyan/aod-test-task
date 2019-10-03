import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Tab,
    Tabs,
    AppBar
} from '@material-ui/core';

import { logoutInit } from '../actions/authActions';

// Statics
import {
    DEV_TYPE,
    PM_TYPE,
    ADMIN_TYPE
} from '../utils/statics';

class HeaderView extends Component {
    componentDidMount() {
        const href = window.location.href;
        const parts = href.split('/');
        const uriPath = parts[parts.length - 1];

        if (uriPath === 'notifs' || uriPath === 'reports' || uriPath === 'users') {
            let uriPathCode = null;
            switch (uriPath) {
                case 'notifs':
                    uriPathCode = 0;
                    break;
                case 'reports':
                    uriPathCode = 1;
                    break;
                case 'users':
                    uriPathCode = 2;
                    break;
                default:
                    uriPathCode = 0;
                    break;
            }
            
            this.setState({
                uriPathCode
            })
        }
    }

    state = {
        uriPathCode: ''
    }

    switchView = (pageCode) => {
        switch (pageCode) {
            case 0:
                window.open('/notifs', '_self');
                break;
            case 1:
                window.open('/reports', '_self');
                break;
            case 2:
                window.open('/users', '_self');
                break;
            default:
                break;
        }
    }

    onSignout = () => {
        this.props.logoutInit();
        window.open('/', '_self');
    }

    render() {

        const {
            uriPathCode
        } = this.state;

        const {
            currentUser,
            isAuthenticated
        } = this.props;

        return(
            <div>
                <AppBar>
                    <Tabs
                        value={uriPathCode}
                        centered>
                        <Tab
                            onClick={ () => this.switchView(0) }
                            label='Notifications' />
                        <Tab
                            onClick={ () => this.switchView(1) }
                            label='Reports' />
                        <Tab
                            onClick={ () => this.switchView(2) }
                            label='Users' />
                        <Tab
                            onClick={this.onSignout}
                            label='SignOut' />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

HeaderView.propTypes = {
    logoutInit: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
    logoutInit
})(HeaderView);