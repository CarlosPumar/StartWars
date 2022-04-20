import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import styles from './Menu.module.css';

const Menu = ({ options }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <h1 className={styles.title}>STAR WARS</h1>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <h3 className={styles.secondTitle}>Sort By</h3>
            {options.map((option, i) => (
              <Nav.Link key={i} onClick={option.sort}>
                {option.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
