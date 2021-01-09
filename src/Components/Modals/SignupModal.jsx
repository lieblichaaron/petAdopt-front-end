import { Modal, Button, Form, Alert } from "react-bootstrap";
import Logo from "../../images/favicon-32x32.png";
import { useHistory } from "react-router-dom";
import { CurrentPetContext, UserContext } from "../../Context";
import { useState, useContext } from "react";
import { signup } from "../../lib/serverFuncs";
import styles from "./Modals.module.css";
import Cookie from "js-cookie";

const SignupModal = (props) => {
  const { currentPet } = useContext(CurrentPetContext);
  const { setCurrentUser } = useContext(UserContext);
  const history = useHistory();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const formFields = {
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  };
  const [formInfo, setFormInfo] = useState(formFields);
  const [error, setError] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const displayError = (errorMsg) => {
    setError(errorMsg);
    setTimeout(() => {
      setError("");
    }, 5000);
  };
  const handleInput = (e) => {
    if (e.target.name === "password confirmation") {
      setPasswordConfirmation(e.target.value);
    } else {
      setFormInfo({
        ...formInfo,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordConfirmation !== formInfo.password) {
      displayError("Passwords do not match");
    } else {
      const currentUser = await signup(formInfo);
      if ("user" in currentUser) {
        if ("_id" in currentUser.user) {
          Cookie.set("jwt", currentUser.token);
          await setCurrentUser(currentUser.user);
          setUserLoggedIn(true);
        } else if ("error" in currentUser) {
          displayError(currentUser.error);
        }
      } else {
        displayError("Server is down, please try again later");
      }
    }
  };
  if (userLoggedIn) {
    if (currentPet) {
      history.push({
        pathname: "/petPage",
        search: `?pet=${currentPet._id}`,
      });
    } else {
      history.push("/home");
    }
  }
  return (
    <Modal
      className={styles.modal}
      animation={false}
      show={props.modalState}
      onHide={() => props.closeModal(false)}
    >
      <Modal.Header closeButton>
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <Modal.Title className="text-center w-100">
          Create an account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group id="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="name"
              name="fullName"
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              minLength="6"
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              name="password confirmation"
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group id="phone-number">
            <Form.Label>Phone number</Form.Label>
            <small>(Format: 1234567890)</small>
            <Form.Control
              type="tel"
              pattern="[0-9]{10}"
              name="phoneNumber"
              onChange={handleInput}
              required
            />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button type="Submit" className="w-100">
            Create an account!
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
