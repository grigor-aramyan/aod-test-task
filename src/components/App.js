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

    render() {

        return(
            <Container
                style={{
                    textAlign: 'center',
                    marginTop: '10vh'
                }}>
                main content will go here!
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