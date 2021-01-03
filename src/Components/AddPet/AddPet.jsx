import { useState } from "react";
import CustomNavbar from "../Navbar/Navbar";
import {
  Form,
  Button,
  Card,
  DropdownButton,
  Dropdown,
  Alert,
} from "react-bootstrap";
import styles from "./AddPet.module.css";
import { addPet } from "../../lib/serverFuncs";

const AddPet = () => {
  const formFields = {
    type: "",
    name: "",
    adoptionStatus: "",
    ownerId: null,
    height: "",
    weight: "",
    color: "",
    bio: "",
    hypoallergenic: null,
    dietaryRestrictions: "",
    breedOfAnimal: "",
  };
  const [formInfo, setFormInfo] = useState(formFields);
  const [alertType, setAlertType] = useState("");
  const [alert, setAlert] = useState(false);
  const [picture, setPicture] = useState(null);
  const [adoptionStatus, setAdoptionStatus] = useState("Select");
  const [petAvailable, setPetAvailable] = useState(true);
  const handleInput = (e) => {
    if (!e.target) {
      setAdoptionStatus(e);
      if (e !== "Looking for a new home") {
        setPetAvailable(false);
        setFormInfo({
          ...formInfo,
          adoptionStatus: e,
        });
      } else {
        setFormInfo({
          ...formInfo,
          ownerId: null,
          adoptionStatus: e,
        });
        setPetAvailable(true);
      }
    } else if (e.target.type === "checkbox") {
      setFormInfo({
        ...formInfo,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.type === "file") {
      setPicture(e.target.files[0]);
    } else {
      let value = e.target.value[0]
        ? e.target.value[0].toUpperCase() + e.target.value.substring(1)
        : e.target.value;
      setFormInfo({
        ...formInfo,
        [e.target.name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("data", JSON.stringify(formInfo));
    formData.append("picture", picture);
    const response = await addPet(formData);
    if (response === "Pet successfully added") {
      setAlertType("success");
      setAlert(response);
      e.target.reset();
      setAdoptionStatus("select");
      setTimeout(() => {
        setAlert(false);
      }, 10000);
    } else {
      setAlertType("danger");
      setAlert(response);
    }
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
              <Form.Control
                required
                name="type"
                type="text"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                name="name"
                type="text"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group id="adoption status">
              <Form.Label>Adoption Status</Form.Label>
              <DropdownButton
                variant="info"
                id="dropdown-basic-button"
                onSelect={handleInput}
                title={adoptionStatus}
                required
              >
                <Dropdown.Item eventKey="Adopted">Adopted</Dropdown.Item>
                <Dropdown.Item eventKey="Fostered">Fostered</Dropdown.Item>
                <Dropdown.Item eventKey="Looking for a new home">
                  Looking for a new home
                </Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            {!petAvailable && (
              <Form.Group id="owner">
                <Form.Label>Owner ID</Form.Label>
                <Form.Control
                  required
                  name="ownerId"
                  type="text"
                  onChange={handleInput}
                />
              </Form.Group>
            )}
            <Form.Group id="height">
              <Form.Label>Height(cm)</Form.Label>
              <Form.Control
                required
                name="height"
                type="text"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group id="weight">
              <Form.Label>Weight(kg)</Form.Label>
              <Form.Control
                required
                name="weight"
                type="text"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group id="color">
              <Form.Label>Color</Form.Label>
              <Form.Control
                required
                name="color"
                type="text"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group id="hypoallergenic">
              <Form.Label>Hypoallergenic (check if true)</Form.Label>
              <Form.Check
                name="hypoallergenic"
                type="checkbox"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group id="dietary restrictions">
              <Form.Label>
                Dietary restrictions (leave empty if none)
              </Form.Label>
              <Form.Control
                name="dietaryRestrictions"
                type="text"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group id="breed of animal">
              <Form.Label>Breed of animal</Form.Label>
              <Form.Control
                name="breedOfAnimal"
                type="text"
                onChange={handleInput}
                required
              />
            </Form.Group>
            <Form.Group id="picture">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                required
                name="picture"
                type="file"
                accept="image/*"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group id="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                required
                name="bio"
                as="textarea"
                rows={3}
                onChange={handleInput}
              />
            </Form.Group>
            {alert && (
              <Alert className="text-center" variant={alertType}>
                {alert}
              </Alert>
            )}
            <Button type="Submit" className="w-100">
              Add Pet
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddPet;
