import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container
} from '@material-ui/core';

class RegisterView extends Component {
    render() {
        return(
            <Container>
                register view will go here
            </Container>
        );
    }
}

RegisterView.propTypes = {

}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {

})(RegisterView);