import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPaw, faUsers } from "@fortawesome/free-solid-svg-icons";
import styles from "./About.module.css";
const About = () => {
  return (
    <div className={`${styles.container} w-100 text-center`}>
      <h3 className={`${styles["about-header"]}`}>About Us</h3>
      <div className={styles.row}>
        <div className={`${styles.col} p-2`}>
          <div className={styles["card-header"]}>
            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
            <h4>Search</h4>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            pharetra imperdiet felis, nec mattis nisi tempus ac. Vestibulum eget
            sapien vel dolor gravida sollicitudin.
          </p>
          <Link className={`${styles["search-link"]}`} to="/petSearch">
            search here
          </Link>
        </div>
        <div className={`${styles.col} p-2`}>
          <div className={styles["card-header"]}>
            <FontAwesomeIcon icon={faPaw} className={styles.icon} />
            <h4>Adopt</h4>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            pharetra imperdiet felis, nec mattis nisi tempus ac. Vestibulum eget
            sapien vel dolor gravida sollicitudin.
          </p>
        </div>
        <div className={`${styles.col} p-2`}>
          <div className={styles["card-header"]}>
            <FontAwesomeIcon icon={faUsers} className={styles.icon} />
            <h4>Our Story</h4>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            pharetra imperdiet felis, nec mattis nisi tempus ac. Vestibulum eget
            sapien vel dolor gravida sollicitudin.
          </p>
        </div>
      </div>
      <footer className={styles.footer}>
        <p className={styles["about-p"]}>&copy; 2020 PetAdopt, Inc.</p>{" "}
      </footer>
    </div>
  );
};

export default About;
