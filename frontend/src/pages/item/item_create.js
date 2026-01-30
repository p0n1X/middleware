import React, { useEffect, useState } from "react";
import { Button, Container, Card, Form, Row, Col, FloatingLabel, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom';
import Sidebar from "../sidebar";


function ItemCreate() {
    const [content, setContent] = useState("");
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const item_url = process.env.REACT_APP_API_URL + '/api/item/';
    const category_url = process.env.REACT_APP_API_URL + '/api/category/';
    const tokenApp = sessionStorage.getItem('token');


    const handleSubmit = event => {
        event.preventDefault();

        axios.post(item_url, {
            content: content,
            priority: priority,
            category_id: category
        },{
            headers: {
                'Authorization': `Bearer ${tokenApp}`,
                'Accept': 'application/json'
            }
        })
            .then(res => {
                if (res.data['message']) {
                    alert(res.data['message'])
                    window.location.replace("/")
                }
            })
    };

    useEffect(() => {
        axios.get(category_url).then(res => {
            setCategories(res.data);
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

                            <Card.Header className="py-3">Create new item</Card.Header>
                            <Card.Body>
                                <Container>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group size="lg" controlId="content" className="mb-3">
                                            <FloatingLabel label="Content">
                                                <Form.Control
                                                    autoFocus
                                                    type="content"
                                                    value={content}
                                                    onChange={(e) => setContent(e.target.value)}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group size="lg" controlId="priority" className="mb-3">
                                            <FloatingLabel label="Priority">
                                                <Form.Select
                                                value={priority}
                                                onChange={(e) => setPriority(e.target.value)}
                                                >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Form.Group>

                                        <Form.Group size="lg" controlId="category" className="mb-3">
                                            <FloatingLabel label="Category">
                                                <Form.Select
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                >
                                                <option value=""></option>
                                                {categories.map(c => (
                                                    <option key={c} value={c.id}>
                                                    {c.name}
                                                    </option>
                                                ))}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Form.Group>
                                    
                                        <Button type="submit">
                                            Submit
                                        </Button>
                                        <Link style={{ float: 'right' }} to={`/`}><Button variant="secondary">Back</Button></Link>
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

export default ItemCreate;