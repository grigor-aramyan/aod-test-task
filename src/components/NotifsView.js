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
import {
    getAllNotifs
} from '../actions/notifActions';
import NotAuthenticatedView from './NotAuthenticatedView';

class NotifsView extends Component {
    componentDidMount() {
        this.props.loadLocalToken();
        this.props.loadUser();

        //const socket = socketIOClient(baseUri);

    }

    componentDidUpdate() {
        const {
            isAuthenticated,
            currentUser
        } = this.props;

        const {
            getNotifsInitial
        } = this.state;

        if (isAuthenticated && currentUser && !getNotifsInitial) {
            this.props.getAllNotifs();
            this.setState({
                getNotifsInitial: true
            });
        }
    }

    state = {
        getNotifsInitial: false
    }

    render() {
        const {
            isAuthenticated,
            currentUser,
            allNotifs
        } = this.props;

        return(
            <div>
                { (isAuthenticated && currentUser) ?
                    <div>
                        <Header />
                        <Container>
                            notifs count: { allNotifs ? allNotifs.length : 0 }
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
    isAuthenticated: PropTypes.bool,
    getAllNotifs: PropTypes.func.isRequired,
    allNotifs: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    allNotifs: state.notifs.allNotifs
});

export default connect(mapStateToProps, {
    loadLocalToken,
    loadUser,
    getAllNotifs
})(NotifsView);