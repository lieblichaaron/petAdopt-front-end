import { Button } from "react-bootstrap";
import styles from "./HomepageLoggedOut.module.css";

const HomepageLoggedOut = () => {
  return (
    <div className={styles["homepage-container"]}>
      <div className={styles["welcome-container"]}>
        <h1 className="m-2">Header welcoming users to the site</h1>
        <p className="ml-2">Text explaining what the service is.</p>
      </div>
      <div className={styles["signup-container"]}>
        <Button className={styles["signup-btn"]}>Sign up</Button>
        <Button className={styles["login-btn"]}>Log in</Button>
      </div>
    </div>
  );
};

export default HomepageLoggedOut;
