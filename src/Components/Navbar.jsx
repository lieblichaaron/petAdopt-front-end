import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../images/favicon-32x32.png";
import styles from "./Navbar.module.css";
const CustomNavbar = () => {
  return (
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

        <NavLink className={styles["header-link"]} to="/MyPets">
          My pets
        </NavLink>

        <NavLink
          className={styles["header-link"]}
          to="/ProfileSettings?name=ProfileSettings"
        >
          Profile settings
        </NavLink>

        <NavLink className={styles["header-link"]} to="/About">
          About us
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
