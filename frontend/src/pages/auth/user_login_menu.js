import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

function UserLoginMenu() {
    const tokenApp = sessionStorage.getItem('token');

    if (tokenApp) {
        return (
            <div>
                <NavDropdown.Item as={Link} to={`/logout`}>Logout</NavDropdown.Item>
            </div>
        )
    } else {
        return (
            <div>
                <NavDropdown.Item as={Link} to={`/register`}>Register</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/login`}>Login</NavDropdown.Item>
            </div>
        )
    }

};

export default UserLoginMenu;