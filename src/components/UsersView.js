import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container,
    Grid,
    Card,
    CardContent
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
    getAllDevsAndPms
} from '../actions/userActions';

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

    render() {
        const {
            isAuthenticated,
            currentUser,
            allDevs,
            allDevsAndPms
        } = this.props;

        return(
            <div>
                { (isAuthenticated && currentUser) ?
                    <div>
                        <Header />
                        <Container>
                            { (currentUser.userType === PM_TYPE) ?
                                ( allDevs && (allDevs.length > 0) ? 
                                    <Grid container spacing={2}>
                                        { allDevs.map(d => {
                                            return(
                                                <Grid item xs={4}>
                                                    <Card>
                                                        <CardContent>
                                                            { d.username }
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
                                ( allDevsAndPms && (allDevsAndPms.length > 0) ? 
                                    <Grid container spacing={2}>
                                        { allDevsAndPms.map(d => {
                                            return(
                                                <Grid item xs={4}>
                                                    <Card>
                                                        <CardContent>
                                                            { d.username }
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
                        </Container>
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
    allDevs: PropTypes.array.isRequired
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
    getAllDevsAndPms
})(UsersView);