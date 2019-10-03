import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container
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
            currentUser
        } = this.props;

        return(
            <Container>
                { currentUser ?
                    <div>
                        username: { currentUser.username}
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
    currentUser: PropTypes.object
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user
});

export default connect(mapStateToProps, {
    loadLocalToken,
    loadUser
})(DashboardView);