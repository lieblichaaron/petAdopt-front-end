import { useContext } from "react";
import { UserContext } from "../../Context";
import styles from "./HomepageLoggedIn.module.css";
import { Link } from "react-router-dom";
import CustomNavbar from "../Navbar/Navbar";
import About from "../About/About";

const HomepageLoggedIn = (props) => {
  const currentUser = useContext(UserContext);
  return (
    <div>
      <div className={styles["page-container"]}>
        {currentUser && <CustomNavbar />}
        <div className={styles["main-container"]}>
          <h1>Welcome back, {currentUser && currentUser.fullName}!</h1>
          <h4>
            Check out your furry friends on your
            <Link className={styles["welcome-link"]} to="/myPets">
              Pets
            </Link>
            Page
          </h4>
          <h4>
            Feeling a little lonely? Check out some
            <Link className={styles["welcome-link"]} to="/petSearch">
              New pets
            </Link>
            waiting to be adopted!
          </h4>
        </div>
      </div>
      <About />
    </div>
  );
};

export default HomepageLoggedIn;
