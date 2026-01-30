import { Link } from 'react-router-dom';
import { ListGroup, Card } from 'react-bootstrap';

function Sidebar() {
  return (
      <Card border="secondary" className="mb-3">
        <Card.Header className="py-3">Menu</Card.Header>
        <Card.Text>
          <ListGroup>
            <ListGroup.Item action as={Link} to={'/'}>
              Items
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to={'/category'}>
              Categories
            </ListGroup.Item>
          </ListGroup>
        </Card.Text>
      </Card>
  );
}

export default Sidebar;