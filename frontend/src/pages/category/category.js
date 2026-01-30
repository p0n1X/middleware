import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Col, Card, Button, Row, Container, Alert } from 'react-bootstrap';
import Sidebar from "../sidebar";


function Category() {
  const url = process.env.REACT_APP_API_URL + '/api/category/';
  const [categories, setCategories] = useState([]);
  const tokenApp = sessionStorage.getItem('token');

  const handleDeleteClick = event => {
    event.preventDefault();
    axios.delete(url + event.target.value , {
      headers: {
        'Authorization': `Bearer ${tokenApp}`,
        'Accept': 'application/json'
      },
    }).then(res => {
      window.location.replace("/category")
    })
  };

  useEffect(() => {
    axios.get(url).then(res => {
      setCategories(res.data);
    })
  }, [])

  if (tokenApp) {
    return (
      <Container>
        <Row>
          <Col xs={2}>
                        <Sidebar />
                    </Col>
          <Col>
            <Card>
              <Card.Header className="py-3">List of Category <Link style={{ float: 'right' }} to={`/category/create/`}><Button variant="success">Add new category</Button></Link></Card.Header>
              <Card.Body>
                <Container>
                  <table class="table table-striped table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col" colSpan="2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(category =>
                        <tr>
                          <th scope="row">{category.name}</th>
                          <th scope="row"><Link to={`/category/edit/${category.id}`}><Button variant="warning">Edit</Button></Link></th>
                          <th scope="row"><Button variant="danger" value={category.id} onClick={handleDeleteClick}>Delete</Button></th>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Alert key="danger" variant="danger">
        You do not have permission to view this page!
      </Alert>
    )
  };
};

export default Category;