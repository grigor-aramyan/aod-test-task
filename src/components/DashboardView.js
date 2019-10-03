import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container,
    Button
} from '@material-ui/core';

// Statics
import {
    DEV_TYPE,
    PM_TYPE,
    ADMIN_TYPE
} from '../utils/statics';

// Actions
import {
    loadLocalToken,
    loadUser
} from '../actions/authActions';
import NotAuthenticatedView from './NotAuthenticatedView';

class DashboardView extends Component {
    componentDidMount() {
        this.props.loadLocalToken();
        this.props.loadUser();
    }

    render() {
        const {
            currentUser,
            isAuthenticated
        } = this.props;

        return(
            <Container>
                { (isAuthenticated && currentUser) ?
                    <div
                        style={{
                            textAlign: 'center'
                        }}>
                        <h3>Welcome { currentUser ? currentUser.username : '' } to most awesome admin panel ))</h3>
                        <hr />
                        <Button
                            onClick={() => window.open('/notifs', '_self')}>Notifications</Button>
                        <br />
                        <Button
                            onClick={() => window.open('/reports', '_self')}>Reports</Button>
                        { currentUser.userType === ADMIN_TYPE ?
                            <div>
                                <br />
                                <Button
                                    onClick={() => window.open('/users', '_self')}>Users</Button>
                            </div>
                        : null
                        }
                    </div>
                : <NotAuthenticatedView />
                }
            </Container>
        );
    }
}

DashboardView.propTypes = {
    loadLocalToken: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
    loadLocalToken,
    loadUser
})(DashboardView);