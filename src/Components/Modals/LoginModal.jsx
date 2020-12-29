import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import Logo from "../../images/favicon-32x32.png";
import { auth } from "../../MockData/Auth";
import { Redirect } from "react-router-dom";
import { login } from "../../lib/serverFuncs";
const LoginModal = (props) => {
  const [error, setError] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const formFields = {
    email: "",
    password: "",
  };
  const [formInfo, setFormInfo] = useState(formFields);
  const handleInput = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUserId = await login(formInfo);
    if (typeof currentUserId !== "object") {
      await props.setCurrentUserId(currentUserId);
      setUserLoggedIn(true);
    } else if (currentUserId) {
      setError(currentUserId.error);
    } else {
      setError("Server is down, please try again later");
    }
  };
  if (userLoggedIn) {
    return <Redirect to="/home" />;
  }
  return (
    <Modal
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
      {error && <Alert variant="danger">{error}</Alert>}
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
          <Button type="Submit" className="w-100">
            Log in
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
