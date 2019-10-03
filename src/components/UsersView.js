import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container
} from '@material-ui/core';

// Components
import Header from './HeaderView';

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

class UsersView extends Component {
    componentDidMount() {
        this.props.loadLocalToken();
        this.props.loadUser();
    }

    componentDidUpdate() {
        const {
            currentUser,
            isAuthenticated
        } = this.props;

        if (isAuthenticated && currentUser && (currentUser.userType === DEV_TYPE || currentUser.userType === PM_TYPE)) {
            window.open('/dashboard', '_self');
        }
    }

    render() {
        const {
            isAuthenticated,
            currentUser
        } = this.props;

        return(
            <div>
                { (isAuthenticated && currentUser) ?
                    <div>
                        <Header />
                        <Container>
                            users will go here
                        </Container>
                    </div>
                    : <NotAuthenticatedView />
                }
            </div>
        );
    }
}

UsersView.propTypes = {
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
})(UsersView);