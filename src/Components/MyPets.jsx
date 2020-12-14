import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../images/favicon-32x32.png";
import styles from "./MyPets.module.css";
const MyPets = () => {
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
          <NavLink className={styles["header-link"]} to="/PetSearch">
            Find a pet
          </NavLink>
          <NavLink className={styles["header-link"]} to="/ProfileSettings">
            Profile settings
          </NavLink>
        </Nav>
      </Navbar>
    </div>
  );
};

export default MyPets;
