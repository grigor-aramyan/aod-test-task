import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

import {
    Button,
    Container
} from '@material-ui/core';

import { 
    loadLocalToken,
    loadUser
    } from '../actions/authActions';

// Components
import LoginView from './LoginView';
import RegisterView from './RegisterView';

class App extends Component {
    componentDidMount() {
        /*const socket = socketIOClient(baseUri);
        socket.on('test', data => console.log('from socket: ' + data.msg));

        setTimeout(() => {
            socket.emit('client test', { msg: 'client secret' });
        }, 5000);*/
        
        /*this.props.loadLocalToken();
        this.props.loadUser();*/
    }

    state = {
        loginVisible: true
    }

    switchToRegisterView = () => {
        this.setState({
            loginVisible: false
        });
    }

    render() {

        const {
            loginVisible
        } = this.state;

        return(
            <Container
                style={{
                    textAlign: 'center',
                    marginTop: '10vh'
                }}>
                { loginVisible ?
                    <LoginView
                        switchToRegisterView={this.switchToRegisterView} />
                : <RegisterView />
                }
            </Container>
        );
    }
}

App.propTypes = {
    loadLocalToken: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    error: state.error
});

export default connect(mapStateToProps, {
    loadLocalToken,
    loadUser
})(App);