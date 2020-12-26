import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../images/favicon-32x32.png";
import styles from "./Navbar.module.css";
import { auth } from "../../MockData/Auth";

const CustomNavbar = () => {
  return (
    <Navbar className={styles["navbar"]}>
      <Navbar.Brand>
        <img src={Logo} alt="logo" />
        PetAdopt
      </Navbar.Brand>
      <Nav className="mr-auto">
        <NavLink className={styles["header-link"]} to="/petSearch">
          Find a pet
        </NavLink>
        <NavLink className={styles["header-link"]} to="/myPets">
          My pets
        </NavLink>
        <NavLink className={styles["header-link"]} to="/profileSettings">
          Profile settings
        </NavLink>
        <NavLink className={styles["header-link"]} to="/home">
          About us
        </NavLink>
        {auth.isAdmin && (
          <NavLink className={styles["header-link"]} to="/addPet">
            Add pet
          </NavLink>
        )}
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;