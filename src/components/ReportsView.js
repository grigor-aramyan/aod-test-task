import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container
} from '@material-ui/core';

// Components
import Header from './HeaderView';

// Actions
import {
    loadLocalToken,
    loadUser
} from '../actions/authActions';
import NotAuthenticatedView from './NotAuthenticatedView';

class ReportsView extends Component {
    componentDidMount() {
        this.props.loadLocalToken();
        this.props.loadUser();
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
                            reports will go here
                        </Container>
                    </div>
                : <NotAuthenticatedView />
                }
            </div>
        );
    }
}

ReportsView.propTypes = {
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
})(ReportsView);