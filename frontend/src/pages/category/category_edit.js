import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Col, Row, FloatingLabel, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Sidebar from "../sidebar";

function CategoryEdit() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [islogin, setIslogin] = useState(false);
    const login_url = process.env.REACT_APP_API_URL + '/api/users/login';
    const category_url = process.env.REACT_APP_API_URL + '/api/category/' + id;;
    const tokenApp = sessionStorage.getItem('token');

    const handleSubmit = event => {
        event.preventDefault();

        axios.put(category_url, { 
            name: name}, {
            headers: {
                'Authorization': `Bearer ${tokenApp}`,
                'Accept': 'application/json'
            }           
        })
            .then(res => {
                window.location.replace("/category/")
            })
    };

    useEffect(() => {
                
        axios.get(category_url).then(res => {
            console.log(res)
            setName(res.data['category']['name']);
        })
    }, []);

    if (tokenApp) {
        return (
            <Container>
                <Row>
                    <Col xs={2}>
                        <Sidebar />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header className="py-3"> Edit Category</Card.Header>
                            <Card.Body>
                                <Container>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group size="lg" controlId="name" className="mb-3">
                                            <FloatingLabel label="Category Name">
                                                <Form.Control
                                                    autoFocus
                                                    type="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Button type="submit">
                                            Submit
                                        </Button>
                                        <Link style={{ float: 'right' }} to={`/category`}><Button variant="secondary">Back</Button></Link>
                                    </Form>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )

    } else {
        return (
            <Alert key="danger" variant="danger">
                You do not have permission to view this page!
            </Alert>
        )
    };

};

export default CategoryEdit;