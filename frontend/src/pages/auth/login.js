import React, { useEffect, useState } from "react";
import {Form, FloatingLabel, Button, Container, Card, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";
import UserLogout from "./logout";

function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [islogin, setIslogin] = useState(false);
    const url = process.env.REACT_APP_API_URL + '/api/auth/login';
    const tokenApp = sessionStorage.getItem('token');
    const handleSubmit = event => {
        event.preventDefault();

        axios.post(url, {
            email: email,
            password: password
        })
            .then(res => {
                if (res.data['success'] === false) {
                    alert(res.data['message'])
                } else {
                    sessionStorage.setItem("token", res.data['token']);
                    window.location.replace("/")
                }
            })
    };

    if (tokenApp) {
        return <UserLogout />;
    } else {
        return (
            <Container>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card >
                        <Card.Header className="mb-4">Login</Card.Header>
                        <Card.Text>
                            <Container className="mb-4">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="email" className="mb-4">
                                        <FloatingLabel label="Email">
                                            <Form.Control
                                                autoFocus
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group controlId="password" className="mb-4">
                                        <FloatingLabel label="Password">
                                            <Form.Control
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Button type="submit" className="mb-4">
                                        Login
                                    </Button>
                                    <Link style={{ float: 'right' }} to={`/register`}><Button variant="secondary">Registration</Button></Link>
                                </Form>
                            </Container>
                        </Card.Text>
                    </Card>
                </Col>
            </Container>
        )
    }

};

export default UserLogin;
