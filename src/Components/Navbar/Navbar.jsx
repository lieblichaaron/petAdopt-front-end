import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import Logo from "../../images/favicon-32x32.png";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { CurrentPetContext, UserContext } from "../../Context";
import Cookie from "js-cookie";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const CustomNavbar = () => {
  const history = useHistory();
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
    Cookie.remove("jwt");
    await setCurrentUser("");
    await setCurrentPet("");
    history.push("/");
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
          <div>
            <NavLink
              className={styles["header-link"]}
              to="/addPet"
              onClick={clearCurrentPet}
            >
              Add pet
            </NavLink>
            <NavLink className={styles["header-link"]} to="/dashboard">
              Dashboard
            </NavLink>
          </div>
        )}
        {!currentUser && (
          <NavLink className={styles["header-link"]} to="/">
            Home
          </NavLink>
        )}
        {currentUser && (
          <div className={styles.logout} onClick={confirmLogOut}>
            Log out
          </div>
        )}
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
