import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container,
    Grid,
    Select,
    MenuItem,
    Button,
    TextField
} from '@material-ui/core';

// Statics
import {
    DEV_TYPE,
    PM_TYPE,
    ADMIN_TYPE
} from '../utils/statics';

class AddUserView extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        telephone: '',
        userType: DEV_TYPE,
        addNewUserError: ''
    }

    onAddNewUser = () => {
        const {
            username,
            password,
            email,
            telephone,
            userType
        } = this.state;

        if (!username || !password || !email) {
            this.setState({
                addNewUserError: 'Username, password and email required!'
            });
        } else if (!email.includes('@') || !email.includes('.')) {
            this.setState({
                addNewUserError: 'Email format doesn\'t look correct!'
            });
        } else {
            this.setState({
                addNewUserError: ''
            });

            const body = {
                username,
                password,
                email,
                telephone,
                userType
            };


        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const {
            username,
            password,
            email,
            telephone,
            userType,
            addNewUserError
        } = this.state;

        return (
            <Container>
                <p
                    style={{
                        textAlign: 'left',
                        marginLeft: '20px'
                    }}>Add New User</p>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <TextField
                            name='username'
                            label="Username"
                            value={username}
                            onChange={this.onChange}
                            required
                            margin="normal"
                            style={{
                                width: '100%'
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            name='password'
                            label="Password"
                            value={password}
                            onChange={this.onChange}
                            required
                            margin="normal"
                            style={{
                                width: '100%'
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            name='email'
                            label="Email"
                            value={email}
                            onChange={this.onChange}
                            required
                            margin="normal"
                            style={{
                                width: '100%'
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            name='telephone'
                            label="Telephone"
                            value={telephone}
                            onChange={this.onChange}
                            margin="normal"
                            style={{
                                width: '100%'
                            }}
                        />
                    </Grid>
                </Grid>
                Add as: 
                <Select
                    value={userType}
                    onChange={this.onChange}
                    name='userType'
                    style={{
                        marginLeft: '10px',
                        marginBottom: '10px',
                        paddingLeft: '5px'
                    }}>
                    <MenuItem value={DEV_TYPE}>Developer</MenuItem>
                    <MenuItem value={PM_TYPE}>PM</MenuItem>
                    <MenuItem value={ADMIN_TYPE}>Admin</MenuItem>
                </Select>
                <br />
                { addNewUserError ?
                    <p
                        style={{
                            color: 'red',
                            fontStyle: 'italic'
                        }}>
                        { addNewUserError }
                    </p>
                : null
                }
                <Button
                    onClick={this.onAddNewUser}>
                    Submit
                </Button>
                <hr />
            </Container>
        );
    }
}

AddUserView.propTypes = {
    error: PropTypes.object
}

const mapStateToProps = (state) => ({
    error: state.error
});

export default connect(mapStateToProps, {

})(AddUserView);