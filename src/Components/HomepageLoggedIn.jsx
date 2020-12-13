import styles from "./HomepageLoggedIn.module.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Logo from "../images/favicon-32x32.png";
const HomepageLoggedIn = () => {
  return (
    <div className={styles["page-container"]}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img src={Logo} alt="logo" />
          PetAdopt
        </Navbar.Brand>
        <Nav>
          <NavLink className={styles["header-link"]} to="/MyPets">
            My Pets
          </NavLink>
          <NavLink className={styles["header-link"]} to="/PetSearch">
            Find a pet
          </NavLink>
          <NavLink className={styles["header-link"]} to="/ProfileSettings">
            Profile Settings
          </NavLink>
        </Nav>
      </Navbar>
      <div className={styles["main-container"]}>
        {/* user name from data */}
        <h1>Welcome back, John Smith!</h1>
        <h4>
          Got enough pets? Check them out on your
          <Link className={styles["welcome-link"]} to="/MyPets">
            My Pets
          </Link>
          Page
        </h4>
        <h4>
          Feeling a little lonely? Check out some
          <Link className={styles["welcome-link"]} to="/PetSearch">
            New pets
          </Link>
          waiting to be adopted!
        </h4>
      </div>
    </div>
  );
};

export default HomepageLoggedIn;
