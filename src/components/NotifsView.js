import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import {
    Container
} from '@material-ui/core';

// Statics
import { baseUri } from '../utils/statics';

// Components
import Header from './HeaderView';

// Actions
import {
    loadLocalToken,
    loadUser
} from '../actions/authActions';
import NotAuthenticatedView from './NotAuthenticatedView';

class NotifsView extends Component {
    componentDidMount() {
        this.props.loadLocalToken();
        this.props.loadUser();

        //const socket = socketIOClient(baseUri);

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
                            notifs will go here
                        </Container>
                    </div>
                : <NotAuthenticatedView />
                }
            </div>
        );
    }
}

NotifsView.propTypes = {
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
})(NotifsView);