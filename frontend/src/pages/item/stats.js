import React, { useEffect, useState } from "react";
import { Badge, ListGroup, Card } from "react-bootstrap";
import axios from "axios";

function Stats() {
  const [stats, setStats] = useState([]);
  const stats_url = process.env.REACT_APP_API_URL + "/api/stats/";

  useEffect(() => {
    axios.get(stats_url).then((res) => {
      console.log(res.data);
      setStats(res.data["data"][0]);
    });
  }, []);

  return (
    <Card border="secondary">
      <Card.Header className="py-3">Stats</Card.Header>
      <Card.Text>
        <ListGroup className="mb-4">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            Items
            <Badge bg="primary" pill>
              {stats.all_items}
            </Badge>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="mb-4">
          <ListGroup.Item className="d-flex justify-content-between align-items-center active">
            Status
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            Completed
            <Badge bg="primary" pill>
              {stats.completed}
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            Incomplete
            <Badge bg="primary" pill>
              {stats.incompleted}
            </Badge>
          </ListGroup.Item>
          </ListGroup>
        <ListGroup className="mb-4">
          <ListGroup.Item className="d-flex justify-content-between align-items-center active">
            Priority
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            Low
            <Badge bg="primary" pill>
              {stats.low_priority}
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            Medium
            <Badge bg="primary" pill>
              {stats.medium_priority}
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            High
            <Badge bg="primary" pill>
              {stats.high_priority}
            </Badge>
          </ListGroup.Item>
        </ListGroup>
      </Card.Text>
    </Card>
  );
}

export default Stats;
