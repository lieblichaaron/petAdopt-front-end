import { useContext, useEffect } from "react";
import { UserContext } from "../../Context";
import styles from "./HomepageLoggedIn.module.css";
import { Link } from "react-router-dom";
import CustomNavbar from "../Navbar/Navbar";
import About from "../About/About";
import { loginWithToken } from "../../lib/serverFuncs";
import Cookie from "js-cookie";
const cookie = Cookie.getJSON("jwt");
const HomepageLoggedIn = (props) => {
  const id = useContext(UserContext);
  useEffect(() => {
    if (!id) {
      loginWithToken(cookie).then((id) => {
        props.setCurrentUserId(id);
      });
    }
  }, []);
  return (
    <div>
      <div className={styles["page-container"]}>
        <CustomNavbar />
        <div className={styles["main-container"]}>
          <h1>Welcome back, {id}!</h1>
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
