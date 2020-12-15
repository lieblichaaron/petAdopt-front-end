import { useContext } from 'react'
import { MyContext } from "./Context";
import styles from "./HomepageLoggedIn.module.css";
import { Link } from "react-router-dom";
import CustomNavbar from "./Navbar";
const HomepageLoggedIn = () => {
  const { full name } = useContext(MyContext)
  return (
    <div className={styles["page-container"]}>
      <CustomNavbar />
      <div className={styles["main-container"]}>
        {/* user name from data */}
        <h1>Welcome back, John Smith!</h1>
        <h4>
          Got enough pets? Check them out on your
          <Link className={styles["welcome-link"]} to="/myPets">
            My pets
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
  );
};

export default HomepageLoggedIn;
