import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import {
    Container,
    Grid
} from '@material-ui/core';

// Components
import Header from './HeaderView';

// Statics
import { 
    baseUri
} from '../utils/statics';

// Actions
import {
    loadLocalToken,
    loadUser
} from '../actions/authActions';
import {
    getAllReports
} from '../actions/reportActions';
import NotAuthenticatedView from './NotAuthenticatedView';

class ReportsView extends Component {
    componentDidMount() {
        this.props.loadLocalToken();
        this.props.loadUser();

        const socket = socketIOClient(baseUri);
        socket.on('new_report', data => {
            // TODO check new reports with socket and add to reports list through redux if appropriate
        });
    }

    componentDidUpdate() {
        const {
            isAuthenticated,
            currentUser
        } = this.props;

        if (isAuthenticated && currentUser && !this.state.initialGetReports) {
            this.props.getAllReports();
            this.setState({
                initialGetReports: true
            });
        }
    }

    state = {
        initialGetReports: false
    }

    render() {
        const {
            isAuthenticated,
            currentUser,
            allReports
        } = this.props;

        return(
            <div>
                { (isAuthenticated && currentUser) ?
                    <div>
                        <Header />
                        <Container>
                            { (allReports.length > 0) ?
                                <div>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            * CONTENT *
                                        </Grid>
                                        <Grid item xs={3}>
                                            * ESTIMATED TIME *
                                        </Grid>
                                        <Grid item xs={3}>
                                            * SPENT TIME *
                                        </Grid>
                                        <Grid item xs={3}>
                                            * STATUS *
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    { allReports.map(r => {
                                        return (
                                            <Grid key={r.id} container spacing={2}>
                                                <Grid item xs={3}>
                                                    { r.body }
                                                </Grid>
                                                <Grid item xs={3}>
                                                    { r.estimationTime }
                                                </Grid>
                                                <Grid item xs={3}>
                                                    { r.spentTime }
                                                </Grid>
                                                <Grid item xs={3}>
                                                    { r.status }
                                                </Grid>
                                            </Grid>
                                        );
                                    }) }
                                </div>
                            : <p>Don't have reports yet!</p>
                            }
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
    isAuthenticated: PropTypes.bool,
    getAllReports: PropTypes.func.isRequired,
    allReports: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    allReports: state.reports.allReports
});

export default connect(mapStateToProps, {
    loadLocalToken,
    loadUser,
    getAllReports
})(ReportsView);