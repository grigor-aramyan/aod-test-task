import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Avatar,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@material-ui/core';

// Components
import Header from './HeaderView';
import NotAuthenticatedView from './NotAuthenticatedView';

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
import {
    getAllDevs,
    getAllDevsAndPms,
    assignTask,
    updateUserRole
} from '../actions/userActions';
import AddUserView from './AddUserView';

class UsersView extends Component {
    componentDidMount() {
        this.props.loadLocalToken();
        this.props.loadUser();
    }

    componentDidUpdate() {
        const {
            currentUser,
            getAllDevs,
            getAllDevsAndPms,
            allDevs,
            allDevsAndPms,
            isAuthenticated
        } = this.props;

        if (isAuthenticated && currentUser && (currentUser.userType === DEV_TYPE)) {
            window.open('/dashboard', '_self');
        }
        
        if (isAuthenticated && currentUser && (currentUser.userType === PM_TYPE) && (allDevs.length == 0)) {
            getAllDevs();
        } else if (isAuthenticated && currentUser && (currentUser.userType === ADMIN_TYPE) && (allDevsAndPms.length == 0)) {
            getAllDevsAndPms();
        }
    }

    state = {
        assignTaskDialogOpened: false,
        assigningTaskTo: null,
        newTaskTitle: '',
        newTaskContent: '',
        addNewTaskError: ''
    }

    onAssignTaskInitiate = (developerId) => {
        this.setState({
            assignTaskDialogOpened: true,
            assigningTaskTo: developerId
        });
    }

    onSubmitNewTask = () => {
        const {
            newTaskTitle,
            newTaskContent,
            assigningTaskTo
        } = this.state;

        const {
            currentUser
        } = this.props;

        if (!assigningTaskTo) {
            this.setState({
                assignTaskDialogOpened: false
            });
        } else if (!newTaskTitle || !newTaskContent) {
            this.setState({
                addNewTaskError: 'Title and Content fields are required!'
            });
        } else {
            let isPm = true;
            if (currentUser.userType === ADMIN_TYPE) {
                isPm = false;
            }

            const body = {
                title: newTaskTitle,
                content: newTaskContent,
                assignedTo: assigningTaskTo,
                assignedFrom: currentUser.id,
                assignedFromIsPm: isPm
            };

            this.props.assignTask(body);
            // TODO check on successful submition of new task before clearing below data
            this.setState({
                newTaskTitle: '',
                newTaskContent: '',
                assignTaskDialogOpened: false,
                addNewTaskError: ''
            });
        }
    }

    onChangeRole = (userId, userType) => {
        this.props.updateUserRole({ userId, userType });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const {
            isAuthenticated,
            currentUser,
            allDevs,
            allDevsAndPms
        } = this.props;

        const {
            assignTaskDialogOpened,
            newTaskTitle,
            newTaskContent,
            addNewTaskError
        } = this.state;

        return(
            <div>
                { (isAuthenticated && currentUser) ?
                    <div>
                        <Header />
                        <Container>
                            { (currentUser.userType === PM_TYPE) ?
                                ( allDevs && (allDevs.length > 0) ? 
                                    <Grid container spacing={2} justify='center'>
                                        { allDevs.map(d => {
                                            return(
                                                <Grid key={d.id} item xs={4}>
                                                    <Card>
                                                        <CardContent>
                                                            <Avatar
                                                                style={{
                                                                    margin: '0 auto',
                                                                    color: 'white',
                                                                    backgroundColor: 'orange'
                                                                }}>A</Avatar>
                                                            <h4>{ d.username }</h4>
                                                            <p
                                                                style={{
                                                                    display: 'inline'
                                                                }}>Role: Developer</p>
                                                            <span
                                                                style={{
                                                                    display: 'block',
                                                                    fontStyle: 'italic',
                                                                    color: 'grey'
                                                                }}>{ d.email }</span>
                                                            { d.telephone ?
                                                                <span
                                                                    style={{
                                                                        display: 'block',
                                                                        fontStyle: 'italic',
                                                                        color: 'grey'
                                                                    }}>Tel: { d.telephone }</span>
                                                            : null
                                                            }
                                                            <hr />
                                                            <Button
                                                                onClick={ () => this.onAssignTaskInitiate(d.id) }
                                                                variant='outlined'>
                                                                Assign Task
                                                            </Button>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            );
                                        }) }
                                    </Grid>
                                : <p
                                    style={{
                                        color: 'red'
                                    }}>No developers found!</p>    
                                )
                            : null
                            }
                            { (currentUser.userType === ADMIN_TYPE) ?
                                <div>
                                    <AddUserView />
                                    { allDevsAndPms && (allDevsAndPms.length > 0) ? 
                                        <Grid container spacing={2} justify='center'>
                                            { allDevsAndPms.map(d => {
                                                let devButtonStyle = {};
                                                let pmButtonStyle = {};
                                                let adminButtonStyle = {};
                                                switch (d.userType) {
                                                    case DEV_TYPE:
                                                        devButtonStyle = {
                                                            border: 'none',
                                                            borderBottom: '2px solid orange',
                                                            pointerEvents: 'none'
                                                        };
                                                        pmButtonStyle = {
                                                            border: 'none'
                                                        };
                                                        adminButtonStyle = {
                                                            border: 'none'
                                                        };
                                                        break;
                                                    case PM_TYPE:
                                                        devButtonStyle = {
                                                            border: 'none'
                                                        };
                                                        pmButtonStyle = {
                                                            border: 'none',
                                                            borderBottom: '2px solid orange',
                                                            pointerEvents: 'none'
                                                        };
                                                        adminButtonStyle = {
                                                            border: 'none'
                                                        };
                                                        break;
                                                    default:
                                                        break;
                                                }

                                                return(
                                                    <Grid key={d.id} item xs={4}>
                                                        <Card>
                                                            <CardContent>
                                                                <Avatar
                                                                    style={{
                                                                        margin: '0 auto',
                                                                        color: 'white',
                                                                        backgroundColor: 'orange'
                                                                    }}>A</Avatar>
                                                                <h4>{ d.username }</h4>
                                                                Role:
                                                                <ButtonGroup
                                                                    style={{
                                                                        marginLeft: '3px'
                                                                    }}
                                                                    size='small'>
                                                                    <Button
                                                                        onClick={ () => this.onChangeRole(d.id, DEV_TYPE) }
                                                                        style={devButtonStyle}>Developer</Button>
                                                                    <Button
                                                                        onClick={ () => this.onChangeRole(d.id, PM_TYPE) }
                                                                        style={pmButtonStyle}>PM</Button>
                                                                    <Button
                                                                        onClick={ () => this.onChangeRole(d.id, ADMIN_TYPE) }
                                                                        style={adminButtonStyle}>Admin</Button>
                                                                </ButtonGroup>
                                                                <span
                                                                    style={{
                                                                        display: 'block',
                                                                        fontStyle: 'italic',
                                                                        color: 'grey'
                                                                    }}>{ d.email }</span>
                                                                { d.telephone ?
                                                                    <span
                                                                        style={{
                                                                            display: 'block',
                                                                            fontStyle: 'italic',
                                                                            color: 'grey'
                                                                        }}>Tel: { d.telephone }</span>
                                                                : null
                                                                }
                                                                { (d.userType === DEV_TYPE) ?
                                                                    <div>
                                                                        <hr />
                                                                        <Button
                                                                            onClick={ () => this.onAssignTaskInitiate(d.id) }
                                                                            variant='outlined'>
                                                                            Assign Task
                                                                        </Button>
                                                                    </div>
                                                                : null
                                                                }
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                );
                                            }) }
                                        </Grid>
                                    : <p
                                        style={{
                                            color: 'red'
                                        }}>No developers found!</p>    
                                    }
                                </div>
                            : null
                            }
                        </Container>
                        <Dialog open={assignTaskDialogOpened}
                            onClose={ () => this.setState({
                                assignTaskDialogOpened: false,
                                newTaskTitle: '',
                                newTaskContent: ''
                            }) }>
                            <DialogTitle>New Task</DialogTitle>
                            <DialogContent>
                                <TextField
                                    name='newTaskTitle'
                                    label="Title"
                                    value={newTaskTitle}
                                    onChange={this.onChange}
                                    required
                                    margin="normal"
                                    style={{
                                        width: '90%'
                                    }}
                                />
                                <TextField
                                    name='newTaskContent'
                                    label="Content"
                                    value={newTaskContent}
                                    onChange={this.onChange}
                                    required
                                    margin="normal"
                                    style={{
                                        width: '90%'
                                    }}
                                />
                                { addNewTaskError ?
                                    <p
                                        style={{
                                            color: 'red',
                                            fontStyle: 'italic'
                                        }}>
                                        { addNewTaskError }
                                    </p>
                                : null
                                }
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={ () => this.setState({
                                        assignTaskDialogOpened: false,
                                        newTaskTitle: '',
                                        newTaskContent: ''
                                    }) }>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={this.onSubmitNewTask}>
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>
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
    isAuthenticated: PropTypes.bool,
    getAllDevs: PropTypes.func.isRequired,
    getAllDevsAndPms: PropTypes.func.isRequired,
    allDevsAndPms: PropTypes.array.isRequired,
    allDevs: PropTypes.array.isRequired,
    assignTask: PropTypes.func.isRequired,
    updateUserRole: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    allDevs: state.users.allDevs,
    allDevsAndPms: state.users.allDevsAndPms
});

export default connect(mapStateToProps, {
    loadLocalToken,
    loadUser,
    getAllDevs,
    getAllDevsAndPms,
    assignTask,
    updateUserRole
})(UsersView);