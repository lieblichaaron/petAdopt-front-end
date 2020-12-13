import { Modal, Button, Form } from "react-bootstrap";
import Logo from "../images/favicon-32x32.png";
const LoginModal = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Modal show={props.modalState} onHide={() => props.closeModal(false)}>
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
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required />
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
