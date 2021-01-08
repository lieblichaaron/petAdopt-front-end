import { Button } from "react-bootstrap";
import styles from "./HomepageLoggedOut.module.css";
import Logo from "../../images/favicon-32x32.png";
import React, { useState } from "react";
import SignupModal from "../Modals/SignupModal";
import LoginModal from "../Modals/LoginModal";
import About from "../About/About";
const HomepageLoggedOut = () => {
  const [signupModalState, setSignupModalState] = useState(false);
  const [loginModalState, setLoginModalState] = useState(false);
  const changeSignupModalState = (condition) => {
    setSignupModalState(condition);
  };
  const changeLoginModalState = (condition) => {
    setLoginModalState(condition);
  };
  return (
    <div className={styles["main-container"]}>
      <SignupModal
        modalState={signupModalState}
        closeModal={changeSignupModalState}
      />
      <LoginModal
        modalState={loginModalState}
        closeModal={changeLoginModalState}
      />
      <div className={styles["homepage-container"]}>
        <div className={styles["welcome-container"]}>
          <h1 className="m-2">Welcome to PetAdopt</h1>
          <p className="ml-2">Find your new best friend, today!</p>
        </div>
        <div className={styles["signup-container"]}>
          <div className={styles["inner-signup-container"]}>
            <div className={styles["inner-signup-container-headings"]}>
              <img src={Logo} alt="logo" />
              <h1 className="mb-3 mt-3">Adopt a pet today!</h1>
            </div>
            <Button
              variant="info"
              className={styles["signup-btn"]}
              onClick={() => changeSignupModalState(true)}
            >
              Sign up
            </Button>
            <Button
              variant="outline-info"
              className={styles["login-btn"]}
              onClick={() => changeLoginModalState(true)}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
      <div className={styles["footer"]}>
        <About />
      </div>
    </div>
  );
};

export default HomepageLoggedOut;
