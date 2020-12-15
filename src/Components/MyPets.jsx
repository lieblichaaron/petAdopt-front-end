import CustomNavbar from "./Navbar";
import { Link } from "react-router-dom";
import styles from "./MyPets.module.scss";
const MyPets = () => {
  return (
    <div className={styles["page-container"]}>
      <CustomNavbar />
      <div className={styles["main-container"]}>
        {true && (
          <h1>
            You currently do not own or foster any pets. <br />
            Looking to Adopt?
            <Link className={styles["non-owner-link"]} to="/petSearch">
              Search pets
            </Link>
          </h1>
        )}
      </div>
      <footer className={styles.footer}>
        <a href="https://www.freepik.com/photos/woman">
          Woman photo created by wayhomestudio - www.freepik.com
        </a>
      </footer>
    </div>
  );
};

export default MyPets;
