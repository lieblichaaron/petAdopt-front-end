import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../images/favicon-32x32.png";
import styles from "./Navbar.module.css";
const CustomNavbar = () => {
  const location = useLocation();
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <img src={Logo} alt="logo" />
        PetAdopt
      </Navbar.Brand>
      <Nav className="mr-auto">
        {location.pathname !== "/" && (
          <NavLink className={styles["header-link"]} to="/">
            Home
          </NavLink>
        )}
        {location.pathname !== "/PetSearch" && (
          <NavLink className={styles["header-link"]} to="/PetSearch">
            Find a pet
          </NavLink>
        )}
        {location.pathname !== "/MyPets" && (
          <NavLink className={styles["header-link"]} to="/MyPets">
            My pets
          </NavLink>
        )}
        {location.pathname !== "/ProfileSettings" && (
          <NavLink
            className={styles["header-link"]}
            to="/ProfileSettings?name=ProfileSettings"
          >
            Profile settings
          </NavLink>
        )}
        {location.pathname !== "/About" && (
          <NavLink className={styles["header-link"]} to="/About">
            About us
          </NavLink>
        )}
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
