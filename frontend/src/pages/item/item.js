import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Col, Card, Button, Row, Container, Alert } from 'react-bootstrap';
import Sidebar from "../sidebar";
import Stats from "./stats";

function daysInProgres(dayCreate, dueDay){

  if(dueDay){
    const day1 = new Date(dayCreate);
    const day2 = new Date(dueDay.replace(' ', 'T'));

    const secInDay = 1000*60*60*24;
    const diffSec = day2 - day1;

    return Math.floor(diffSec / secInDay);
  } else {
    return "--"
  }

}

function Item() {
  const url = process.env.REACT_APP_API_URL + '/api/item/';
  const completed_url = process.env.REACT_APP_API_URL + '/api/item/completed/';
  const category_url = process.env.REACT_APP_API_URL + '/api/category/';
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const tokenApp = sessionStorage.getItem('token');

  const handleCompletedClick = event => {
    event.preventDefault();
    axios.put(completed_url + event.target.value ,{},
       {
      headers: {
        'Authorization': `Bearer ${tokenApp}`,
        'Accept': 'application/json'
      },
    }).then(res => {
      window.location.replace("/")
    })
  };

  const handleDeleteClick = event => {
    event.preventDefault();
    axios.delete(url + event.target.value , {
      headers: {
        'Authorization': `Bearer ${tokenApp}`,
        'Accept': 'application/json'
      },
    }).then(res => {
      window.location.replace("/")
    })
  };
  const [filters, setFilters] = useState({
      category: "",
      priority: "",
      status: "",
      user: "",
    });
  
    const handleChangeFilter = (e) => {
      const { name, value } = e.target;
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmitFilter = (e) => {
    e.preventDefault();
    const queryString = new URLSearchParams(filters).toString();
     axios.get(url + `?${queryString}`
     ).then(res => {
      setItems(res.data['data'])
    })
  };

  useEffect(() => {
    if(tokenApp){
    axios.get(url).then(res => {
      setItems(res.data['data']);
    })

    axios.get(category_url).then(res => {
            setCategories(res.data);
        })
    }
    

  }, [])


  if (tokenApp) {
    return (
      <Container>
        <Row>
          <Col xs={2}>
            <Sidebar />
            <Card border="secondary" className="mb-3">
                    <Card.Header className="py-3">Filter</Card.Header>
                    <Card.Text>
                      <form className="p-3 border rounded" onSubmit={handleSubmitFilter}>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      name="category"
                      value={filters.category}
                      onChange={handleChangeFilter}
                    >
                        <option value="">All</option>
                      {categories.map(c => (
                        <option key={c} value={c.id}>
                        {c.name}
                        </option>
                    ))}
                    </select>
                  </div>
            
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      name="priority"
                      value={filters.priority}
                      onChange={handleChangeFilter}
                    >
                      <option value="">All</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
            
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={filters.status}
                      onChange={handleChangeFilter}
                    >
                      <option value="">All</option>
                      <option value="completed">Completed</option>
                      <option value="incomplete">Incomplete</option>
                    </select>
                  </div>
            
                  <button type="submit" className="btn btn-info w-100">
                    Submit
                  </button>
                </form>
                    </Card.Text>
             </Card>
             <Stats />
          </Col>
          <Col>
            <Card>
              <Card.Header className="py-3">List of Items <Link style={{ float: 'right' }} to={`/item/create/`}><Button variant="success">Add new item</Button></Link></Card.Header>
              <Card.Body>
                <Container>
                  <table class="table table-striped table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Content</th>
                        <th scope="col">Category</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Status</th>
                        <th scope="col">User</th>
                        <th scope="col">Due Date</th>
                        <th scope="col" colSpan="3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(item =>
                        <tr>
                          <th scope="row">{item.content}</th>
                          <th scope="row">{item.category.name}</th>
                          <th scope="row">{item.priority}</th>
                          <th scope="row">{item.is_completed}</th>
                          <th scope="row">{item.user.name}</th>
                          <th scope="row">{daysInProgres(item.created_at ,item.due_date)}</th>
                          <th scope="row">
                            {item.is_completed !== 'Completed' ? (
                              <Button variant="success" value={item.id} onClick={handleCompletedClick}>Done</Button>
                            ) : ( 
                              <span></span>
                            )}
                            </th>
                          <th scope="row"><Link to={`/item/edit/${item.id}`}><Button variant="warning">Edit</Button></Link></th>
                          <th scope="row"><Button variant="danger" value={item.id} onClick={handleDeleteClick}>Delete</Button></th>
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
      <div>
        <Alert key="danger" variant="danger">
          You do not have permission to view this page!
        </Alert>
        <Link to={`/login`}><Button>Login</Button></Link>
      </div>
    )
  };
};

export default Item;