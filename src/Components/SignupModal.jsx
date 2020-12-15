import { Modal, Button, Form } from "react-bootstrap";
import Logo from "../images/favicon-32x32.png";
import { fakeAuth } from "../MockData/FakeAuth";
import { Redirect } from "react-router-dom";
import { useState } from "react";
const SignupModal = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    fakeAuth.authenticate(() => {
      setUserLoggedIn(true);
    });
  };
  if (userLoggedIn) {
    return <Redirect to="/home" />;
  }
  return (
    <Modal show={props.modalState} onHide={() => props.closeModal(false)}>
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
            <Form.Control type="name" required />
          </Form.Group>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required />
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" required />
          </Form.Group>
          <Form.Group id="phone-number">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="phone-number" required />
          </Form.Group>
          <Button type="Submit" className="w-100">
            Create an account!
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
