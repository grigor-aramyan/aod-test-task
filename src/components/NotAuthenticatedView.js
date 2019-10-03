import React, { Component } from 'react';
import { Container, Button } from '@material-ui/core';

export default class NotAuthenticatedView extends Component {
    render() {
        return(
            <Container
                style={{
                    paddingTop: '20vh'
                }}>
                <div
                    style={{
                        textAlign: 'center'
                    }}>
                    <h2>Not authenticated</h2>
                    <Button
                        onClick={ () => window.open('/', '_self') }>
                        Go to Login
                    </Button>
                </div>
            </Container>
        );
    }
}