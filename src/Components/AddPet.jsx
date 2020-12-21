import { useState } from "react";
import CustomNavbar from "./Navbar";
import { Form, Button, Card, Dropdown } from "react-bootstrap";
import styles from "./AddPet.module.css";

const AddPet = () => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [breed, setBreed] = useState("");
  const [picture, setPicture] = useState("");
  const [bio, setBio] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <CustomNavbar />
      <Card className={styles.card}>
        <Card.Body>
          <h1 className="w-100 text-center">Add a pet</h1>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group id="type">
              <Form.Label>Type</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group id="adoption status">
              <Form.Label>Adoption Status</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                  Choose one
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Adopted</Dropdown.Item>
                  <Dropdown.Item>Fostered</Dropdown.Item>
                  <Dropdown.Item>Looking for a new home</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group id="height">
              <Form.Label>Height</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group id="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group id="color">
              <Form.Label>Color</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group id="hypoallergenic">
              <Form.Label>Hypoallergenic</Form.Label>
              <Form.Check />
            </Form.Group>
            <Form.Group id="dietary restrictions">
              <Form.Label>Dietary restrictions</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group id="breed of animal">
              <Form.Label>Breed of animal</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group id="picture">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group id="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button type="Submit" className="w-100">
              Save changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddPet;
