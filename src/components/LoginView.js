import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    Button,
    Select,
    MenuItem,
    TextField,
    Container
} from '@material-ui/core';

// Statics
import {
    PM_TYPE,
    DEV_TYPE,
    ADMIN_TYPE
} from '../utils/statics';

class LoginView extends Component {
    state = {
        userType: DEV_TYPE,
        devUsername: '',
        devPassword: '',
        pmUsername: '',
        pmPassword: '',
        adminUsername: '',
        adminPassword: '',
        loginError: ''
    }

    onLogin = () => {
        const {
            userType,
            devUsername,
            devPassword,
            pmUsername,
            pmPassword,
            adminUsername,
            adminPassword
        } = this.state;

        if (userType == DEV_TYPE) {
            if (!devUsername || !devPassword) {
                this.setState({
                    loginError: 'Both fields required!'
                });
            } else {
                const body = {
                    username: devUsername,
                    password: devPassword
                };


            }
        } else if (userType == PM_TYPE) {
            if (!pmUsername || !pmPassword) {
                this.setState({
                    loginError: 'Both fields required!'
                });
            } else {
                const body = {
                    username: pmUsername,
                    password: pmPassword
                };

                
            }
        } else {
            if (!adminUsername || !adminPassword) {
                this.setState({
                    loginError: 'Both fields required!'
                });
            } else {
                const body = {
                    username: adminUsername,
                    password: adminPassword
                };


            }
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const {
            userType,
            devUsername,
            devPassword,
            pmUsername,
            pmPassword,
            adminUsername,
            adminPassword
        } = this.state;

        let usernameFieldName = null;
        if (userType === DEV_TYPE) {
            usernameFieldName = 'devUsername';
        } else if (userType === PM_TYPE) {
            usernameFieldName = 'pmUsername';
        } else {
            usernameFieldName = 'adminUsername';
        }

        let usernameFieldValue = '';
        if (userType === DEV_TYPE) {
            usernameFieldValue = devUsername;
        } else if (userType === PM_TYPE) {
            usernameFieldValue = pmUsername;
        } else {
            usernameFieldValue = adminUsername;
        }

        let passwordFieldName = null;
        if (userType === DEV_TYPE) {
            passwordFieldName = 'devPassword';
        } else if (userType === PM_TYPE) {
            passwordFieldName = 'pmPassword';
        } else {
            passwordFieldName = 'adminPassword';
        }

        let passwordFieldValue = '';
        if (userType === DEV_TYPE) {
            passwordFieldValue = devPassword;
        } else if (userType === PM_TYPE) {
            passwordFieldValue = pmPassword;
        } else {
            passwordFieldValue = adminPassword;
        }

        let userTypeName = '';
        if (userType === DEV_TYPE) {
            userTypeName = 'Developer';
        } else if (userType === PM_TYPE) {
            userTypeName = 'Manager';
        } else {
            userTypeName = 'Admin';
        }

        return(
            <Container
                style={{
                    width: '30vw'
                }}>
                <h2>Login</h2>
                <TextField
                    name={usernameFieldName}
                    label="Username"
                    value={usernameFieldValue}
                    onChange={this.onChange}
                    margin="normal"
                    style={{
                        width: '20vw'
                    }}
                />
                <TextField
                    name={passwordFieldName}
                    label="Password"
                    value={passwordFieldValue}
                    onChange={this.onChange}
                    style={{
                        width: '20vw'
                    }}
                />
                <br />
                <div
                    style={{
                        textAlign: 'right'
                    }}>
                        <a
                            style={{
                                color: 'deepskyblue',
                                fontStyle: 'italic',
                                textDecoration: 'none',
                                marginRight: ''
                            }}
                            href='#'
                            onClick={this.props.switchToRegisterView}>
                                Register
                        </a>
                </div>
                <div>
                    <Button
                        onClick={this.onLogin}
                        variant='outlined'>
                        Login as
                    </Button>
                    <Select
                        style={{
                            marginLeft: '10px',
                            paddingLeft: '5px'
                        }}
                        value={userType}
                        onChange={this.onChange}
                        name='userType'>
                            <MenuItem value={DEV_TYPE}>Developer</MenuItem>
                            <MenuItem value={PM_TYPE}>PM</MenuItem>
                            <MenuItem value={ADMIN_TYPE}>Admin</MenuItem>
                    </Select>
                </div>
            </Container>
        );
    }
}

LoginView.propTypes = {
    switchToRegisterView: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {

})(LoginView);