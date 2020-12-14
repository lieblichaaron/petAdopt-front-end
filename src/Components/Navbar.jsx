import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../images/favicon-32x32.png";
import styles from "./Navbar.module.css";
const CustomNavbar = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <img src={Logo} alt="logo" />
        PetAdopt
      </Navbar.Brand>
      <Nav className="mr-auto">
        {query.get("name") !== "Home" && (
          <NavLink className={styles["header-link"]} to="/?name=Home">
            Home
          </NavLink>
        )}
        {query.get("name") !== "PetSearch" && (
          <NavLink
            className={styles["header-link"]}
            to="/PetSearch?name=PetSearch"
          >
            Find a pet
          </NavLink>
        )}
        {query.get("name") !== "MyPets" && (
          <NavLink className={styles["header-link"]} to="/MyPets?name=MyPets">
            My pets
          </NavLink>
        )}
        {query.get("name") !== "ProfileSettings" && (
          <NavLink
            className={styles["header-link"]}
            to="/ProfileSettings?name=ProfileSettings"
          >
            Profile settings
          </NavLink>
        )}
        {query.get("name") !== "About" && (
          <NavLink className={styles["header-link"]} to="/About?name=About">
            About us
          </NavLink>
        )}
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
