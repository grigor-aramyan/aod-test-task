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

class RegisterView extends Component {

    state ={
        userType: DEV_TYPE,
        devUsername: '',
        devPassword: '',
        devEmail: '',
        devTelephone: '',
        pmUsername: '',
        pmPassword: '',
        pmEmail: '',
        pmTelephone: '',
        adminUsername: '',
        adminPassword: '',
        adminEmail: '',
        adminTelephone: '',
        registerError: ''
    }

    onRegister = () => {
        const {
            userType,
            devUsername,
            devPassword,
            devEmail,
            devTelephone,
            pmUsername,
            pmPassword,
            pmEmail,
            pmTelephone,
            adminUsername,
            adminPassword,
            adminEmail,
            adminTelephone
        } = this.state;

        if (userType == DEV_TYPE) {
            if (!devUsername || !devPassword || !devEmail) {
                this.setState({
                    registerError: 'Username, password and email fields required!'
                });
            } else if (!devEmail.includes('@') || !devEmail.includes('.')) {
                this.setState({
                    registerError: 'Email doesn\'t look correct!'
                });
            } else {
                const body = {
                    username: devUsername,
                    password: devPassword,
                    email: devEmail,
                    telephone: devTelephone
                };


            }
        } else if (userType == PM_TYPE) {
            if (!pmUsername || !pmPassword || !pmEmail) {
                this.setState({
                    loginError: 'Username, password and email fields required!'
                });
            } else if (!pmEmail.includes('@') || !pmEmail.includes('.')) {
                this.setState({
                    registerError: 'Email doesn\'t look correct!'
                });
            } else {
                const body = {
                    username: pmUsername,
                    password: pmPassword,
                    email: pmEmail,
                    telephone: pmTelephone
                };


            }
        } else {
            if (!adminUsername || !adminPassword || !adminEmail) {
                this.setState({
                    loginError: 'Username, password and email fields required!'
                });
            } else if (!adminEmail.includes('@') || !adminEmail.includes('.')) {
                this.setState({
                    registerError: 'Email doesn\'t look correct!'
                });
            } else {
                const body = {
                    username: adminUsername,
                    password: adminPassword,
                    email: adminEmail,
                    telephone: adminTelephone
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
            devEmail,
            devTelephone,
            pmUsername,
            pmPassword,
            pmEmail,
            pmTelephone,
            adminUsername,
            adminPassword,
            adminEmail,
            adminTelephone,
            registerError
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

        let emailFieldName = null;
        if (userType === DEV_TYPE) {
            emailFieldName = 'devEmail';
        } else if (userType === PM_TYPE) {
            emailFieldName = 'pmEmail';
        } else {
            emailFieldName = 'adminEmail';
        }

        let emailFieldValue = '';
        if (userType === DEV_TYPE) {
            emailFieldValue = devEmail;
        } else if (userType === PM_TYPE) {
            emailFieldValue = pmEmail;
        } else {
            emailFieldValue = adminEmail;
        }

        let telephoneFieldName = null;
        if (userType === DEV_TYPE) {
            telephoneFieldName = 'devTelephone';
        } else if (userType === PM_TYPE) {
            telephoneFieldName = 'pmTelephone';
        } else {
            telephoneFieldName = 'adminTelephone';
        }

        let telephoneFieldValue = '';
        if (userType === DEV_TYPE) {
            telephoneFieldValue = devTelephone;
        } else if (userType === PM_TYPE) {
            telephoneFieldValue = pmTelephone;
        } else {
            telephoneFieldValue = adminTelephone;
        }
        return(
            <Container
                style={{
                    width: '30vw'
                }}>
                <h2>Register</h2>
                <TextField
                    name={usernameFieldName}
                    label="Username"
                    value={usernameFieldValue}
                    onChange={this.onChange}
                    required
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
                    required
                    margin="normal"
                    style={{
                        width: '20vw'
                    }}
                />
                <TextField
                    name={emailFieldName}
                    label="Email"
                    value={emailFieldValue}
                    onChange={this.onChange}
                    type='email'
                    required
                    margin="normal"
                    style={{
                        width: '20vw'
                    }}
                />
                <TextField
                    name={telephoneFieldName}
                    label="Telephone"
                    value={telephoneFieldValue}
                    onChange={this.onChange}
                    margin="normal"
                    style={{
                        width: '20vw'
                    }}
                />
                { registerError ?
                    <p
                        style={{
                            color: 'red',
                            fontStyle: 'italic'
                        }}>
                        { registerError }
                    </p>
                : null
                }
                <div>
                    <Button
                        onClick={this.onRegister}
                        variant='outlined'>
                        Register as
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

RegisterView.propTypes = {

}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {

})(RegisterView);