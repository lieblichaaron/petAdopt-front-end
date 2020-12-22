import { Modal, Button, Form, Alert } from "react-bootstrap";
import Logo from "../images/favicon-32x32.png";
import { fakeAuth } from "../MockData/FakeAuth";
import { Redirect } from "react-router-dom";
import { useState } from "react";
const SignupModal = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const formFields = {
    id: null,
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    bio: "",
    savedPets: [],
    pets: [],
  };
  const [formInfo, setFormInfo] = useState(formFields);
  const [error, setError] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const handleInput = (e) => {
    if (e.target.name === "password confirmation") {
      setPasswordConfirmation(e.target.value);
    } else if (e.target.name === "fullName") {
      let value = e.target.value[0]
        ? e.target.value[0].toUpperCase() + e.target.value.substring(1)
        : e.target.value;
      setFormInfo({
        ...formInfo,
        [e.target.name]: value,
      });
    } else {
      setFormInfo({
        ...formInfo,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordConfirmation !== formInfo.password) {
      setError("Passwords do not match");
      return setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      console.log(formInfo);
      fakeAuth.authenticate(() => {
        setUserLoggedIn(true);
      });
    }
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
      {error && <Alert variant="danger">{error}</Alert>}
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
            <Form.Control
              type="phone-number"
              name="phoneNumber"
              onChange={handleInput}
              required
            />
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
