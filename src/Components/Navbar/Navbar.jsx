import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../images/favicon-32x32.png";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { UserContext } from "../../Context";

const CustomNavbar = (props) => {
  // clear add pet page on click
  const currentUser = useContext(UserContext);
  const clearCurrentPet = () => {
    props.setCurrentPet("");
  };
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
        {currentUser && currentUser.adminStatus && (
          <NavLink
            className={styles["header-link"]}
            to="/addPet"
            onClick={clearCurrentPet}
          >
            Add pet
          </NavLink>
        )}
        {!currentUser && (
          <NavLink className={styles["header-link"]} to="/">
            Home
          </NavLink>
        )}
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
