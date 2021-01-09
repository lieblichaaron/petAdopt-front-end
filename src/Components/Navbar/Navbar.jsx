import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../images/favicon-32x32.png";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { CurrentPetContext, UserContext } from "../../Context";
import Cookie from "js-cookie";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const CustomNavbar = () => {
  const { setCurrentUser, currentUser } = useContext(UserContext);
  const { setCurrentPet } = useContext(CurrentPetContext);
  const clearCurrentPet = () => {
    setCurrentPet("");
  };
  const confirmLogOut = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="text-center">
            <h1>
              <img className="pb-2 pr-2" src={Logo} alt="logo" />
              <div>Log out?</div>
            </h1>
            <p className="text-center">
              You can always log back in to PetAdopt at any time.
            </p>
            <Button className="mr-2" variant="outline-info" onClick={onClose}>
              cancel
            </Button>
            <Button
              variant="info"
              onClick={() => {
                logOut();
                onClose();
              }}
            >
              Log out
            </Button>
          </div>
        );
      },
    });
  };
  const logOut = async () => {
    await Cookie.remove("jwt");
    await setCurrentUser("");
    await setCurrentPet("");
    window.location.reload();
  };
  return (
    <Navbar className={styles["navbar"]} expand="lg">
      <Navbar.Brand>
        <img src={Logo} alt="logo" />
        PetAdopt
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavLink className={styles["header-link"]} to="/petSearch">
            Find a pet
          </NavLink>
          {currentUser && (
            <NavLink className={styles["header-link"]} to="/myPets">
              My pets
            </NavLink>
          )}
          {currentUser && (
            <NavLink className={styles["header-link"]} to="/profileSettings">
              Profile
            </NavLink>
          )}

          {currentUser && currentUser.adminStatus && (
            <NavLink
              className={styles["header-link"]}
              to="/addPet"
              onClick={clearCurrentPet}
            >
              Add pet
            </NavLink>
          )}
          {currentUser && currentUser.adminStatus && (
            <NavLink className={styles["header-link"]} to="/dashboard">
              Dashboard
            </NavLink>
          )}
          {!currentUser && (
            <NavLink className={styles["header-link"]} to="/">
              Home
            </NavLink>
          )}
        </Nav>
        {currentUser && (
          <NavLink className={styles.about} to="/home">
            About us
          </NavLink>
        )}
        {currentUser && (
          <div className={styles.logout} onClick={confirmLogOut}>
            Log out
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
