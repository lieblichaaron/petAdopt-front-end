import styles from "./ProfileSettings.module.css";
import { Navbar, Nav, Form, Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../images/favicon-32x32.png";
const ProfileSettings = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img src={Logo} alt="logo" />
          PetAdopt
        </Navbar.Brand>
        <Nav className="mr-auto">
          <NavLink className={styles["header-link"]} to="/">
            Home
          </NavLink>
          <NavLink className={styles["header-link"]} to="/MyPets">
            My pets
          </NavLink>
          <NavLink className={styles["header-link"]} to="/PetSearch">
            Find a pet
          </NavLink>
        </Nav>
      </Navbar>
      <div className={styles["main-body-container"]}>
        <div className={styles["main-body-pic"]}>
          {/* make this background a rotating album of the users pets if they have any */}
        </div>
        <Card className={styles.card}>
          <Card.Body>
            <h1>Update your information!</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group id="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="name" />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Form.Group id="phone-number">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="phone-number" />
              </Form.Group>
              <Form.Group id="bio">
                <Form.Label>Add a bio</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Button type="Submit" className="w-100">
                Save changes
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
