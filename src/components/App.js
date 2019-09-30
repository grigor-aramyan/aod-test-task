import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { 
    loadLocalToken,
    loadUser
    } from '../actions/authActions';

// Components

class App extends Component {
    /*componentDidMount() {
        this.props.loadLocalToken();
        this.props.loadUser();
    }*/

    render() {

        return(
            <div>
                initial structure
            </div>
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