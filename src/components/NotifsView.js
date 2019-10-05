import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import {
    Container,
    Grid,
    Button
} from '@material-ui/core';

// Statics
import { baseUri, REPORT_ACCEPTED_NOTIF, REPORT_REJECTED_NOTIF, DEV_REPORTED_NOTIF, ADMIN_TYPE, PM_TYPE, TASK_ASSIGNED_NOTIF, DEV_TYPE } from '../utils/statics';

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
import {
    getTaskById
} from '../actions/taskActions';
import {
    getReportById
} from '../actions/reportActions';
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

    onSeeReport = (reportId) => {
        this.props.getReportById(reportId);
    }

    onSeeTask = (taskId) => {
        this.props.getTaskById(taskId);
    }

    render() {
        const {
            isAuthenticated,
            currentUser,
            allNotifs,
            currentReport,
            currentTask
        } = this.props;

        return(
            <div>
                { (isAuthenticated && currentUser) ?
                    <div>
                        <Header />
                        <Container>
                            { (allNotifs.length > 0) ?
                                <div>
                                    <Grid container spacing={2}
                                        style={{
                                            fontStyle: 'italic'
                                        }}>
                                        <Grid item xs={2}>
                                            * ID *
                                        </Grid>
                                        <Grid item xs={2}>
                                            * TASK ID *
                                        </Grid>
                                        <Grid item xs={2}>
                                            * REPORT ID *
                                        </Grid>
                                        <Grid item xs={2}>
                                            * ADDRESSED TO DEV *
                                        </Grid>
                                        <Grid item xs={2}>
                                            * ACTION *
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    { allNotifs.map(n => {
                                        let itemStyle = null;
                                        if (n.seen) {
                                            itemStyle = {
                                                textAlign: 'center',
                                                color: 'grey'
                                            }
                                        } else {
                                            itemStyle = {
                                                textAlign: 'center'
                                            }
                                        }

                                        if (n.notifType === REPORT_ACCEPTED_NOTIF) {
                                            itemStyle.borderLeft = '1px solid green',
                                            itemStyle.borderRight = '1px solid green',
                                            itemStyle.color = 'green',
                                            itemStyle.textDecoration = 'underline'
                                        } else if (n.notifType === REPORT_REJECTED_NOTIF) {
                                            itemStyle.borderLeft = '1px solid red',
                                            itemStyle.borderRight = '1px solid red',
                                            itemStyle.color = 'red',
                                            itemStyle.textDecoration = 'underline'
                                        }

                                        return (
                                            <Grid container key={n.id}
                                                style={ itemStyle }>
                                                <Grid item xs={2}>
                                                    { n.id }
                                                </Grid>
                                                <Grid item xs={2}>
                                                    { n.taskId ? n.taskId : '0' }
                                                </Grid>
                                                <Grid item xs={2}>
                                                    { n.reportId ? n.reportId : '0' }
                                                </Grid>
                                                <Grid item xs={2}>
                                                    { n.addressedTo ? n.addressedTo : '0' }
                                                </Grid>
                                                <Grid item xs={2}>
                                                    { ((n.notifType === DEV_REPORTED_NOTIF) && currentUser && ((currentUser.userType === ADMIN_TYPE) || (currentUser.userType === PM_TYPE))) ?
                                                        <Button
                                                            onClick={ () => this.onSeeReport(n.reportId) } >
                                                            See report
                                                        </Button>
                                                    : null
                                                    }
                                                    { ((n.notifType === TASK_ASSIGNED_NOTIF) && currentUser && (currentUser.userType === DEV_TYPE) && (n.addressedTo === currentUser.id)) ?
                                                        <Button
                                                            onClick={ () => this.onSeeTask(n.taskId) } >
                                                            See task
                                                        </Button>
                                                    : null
                                                    }
                                                </Grid>
                                            </Grid>
                                        );
                                    }) }
                                </div>
                            : <p>You have 0 notifs yet!</p>
                            }
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
    allNotifs: PropTypes.array.isRequired,
    getTaskById: PropTypes.fund.isRequired,
    getReportById: PropTypes.fund.isRequired
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    allNotifs: state.notifs.allNotifs,
    currentTask: state.tasks.currentTask,
    currentReport: state.reports.currentReport
});

export default connect(mapStateToProps, {
    loadLocalToken,
    loadUser,
    getAllNotifs,
    getTaskById,
    getReportById
})(NotifsView);