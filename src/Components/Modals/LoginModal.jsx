import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState, useContext } from "react";
import { CurrentPetContext, UserContext } from "../../Context";
import Logo from "../../images/favicon-32x32.png";
import { useHistory } from "react-router-dom";
import { login } from "../../lib/serverFuncs";
import styles from "./Modals.module.css";
import Cookie from "js-cookie";

const LoginModal = (props) => {
  const { currentPet } = useContext(CurrentPetContext);
  const { setCurrentUser } = useContext(UserContext);
  const history = useHistory();

  const [error, setError] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const formFields = {
    email: "",
    password: "",
  };
  const [formInfo, setFormInfo] = useState(formFields);
  const displayError = (errorMsg) => {
    setError(errorMsg);
    setTimeout(() => {
      setError("");
    }, 5000);
  };
  const handleInput = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = await login(formInfo);
    if (typeof currentUser === "object" && "user" in currentUser) {
      if ("_id" in currentUser.user) {
        Cookie.set("jwt", currentUser.token, { expires: 3 });
        await setCurrentUser(currentUser.user);
        setUserLoggedIn(true);
      } else if ("error" in currentUser) {
        displayError(currentUser.error);
      }
    } else {
      displayError("Server is down, please try again later");
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
    window.location.reload();
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
        <Modal.Title className="text-center w-100">Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
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
              onChange={handleInput}
              required
            />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button type="Submit" className="w-100">
            Log in
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
