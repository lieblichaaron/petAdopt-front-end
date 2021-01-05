import { useState, useContext } from "react";
import { CurrentPetContext } from "../../Context";
import {
  Form,
  Button,
  Card,
  DropdownButton,
  Dropdown,
  Alert,
} from "react-bootstrap";
import styles from "./AddPet.module.css";
import { useHistory } from "react-router-dom";
import { addPet, updatePet } from "../../lib/serverFuncs";

const AddPet = (props) => {
  const search = window.location.search;
  const query = new URLSearchParams(search);
  let currentPet = useContext(CurrentPetContext);
  const history = useHistory();

  if (!query.get("pet")) {
    currentPet = {
      type: "",
      name: "",
      adoptionStatus: "Select",
      ownerId: "",
      height: "",
      weight: "",
      color: "",
      bio: "",
      hypoallergenic: false,
      dietaryRestrictions: "",
      breedOfAnimal: "",
    };
  }
  const formFields = {
    type: currentPet.type,
    name: currentPet.name,
    adoptionStatus: currentPet.adoptionStatus,
    ownerId: currentPet.ownerId,
    height: currentPet.height,
    weight: currentPet.weight,
    color: currentPet.color,
    bio: currentPet.bio,
    hypoallergenic: currentPet.hypoallergenic,
    dietaryRestrictions: currentPet.dietaryRestrictions,
    breedOfAnimal: currentPet.breedOfAnimal,
  };
  const [formInfo, setFormInfo] = useState(formFields);
  const [alertType, setAlertType] = useState("");
  const [alert, setAlert] = useState(false);
  const [picture, setPicture] = useState(null);
  const [adoptionStatus, setAdoptionStatus] = useState(
    currentPet.adoptionStatus
  );
  const [type, setType] = useState(currentPet.type);
  const [name, setName] = useState(currentPet.name);
  const [ownerId, setOwnerId] = useState(currentPet.ownerId);
  const [height, setHeight] = useState(currentPet.height);
  const [weight, setWeight] = useState(currentPet.weight);
  const [color, setColor] = useState(currentPet.color);
  const [bio, setBio] = useState(currentPet.bio);
  const [hypoallergenic, setHypoallergenic] = useState(
    currentPet.hypoallergenic
  );
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    currentPet.dietaryRestrictions
  );
  const [breedOfAnimal, setBreedOfAnimal] = useState(currentPet.breedOfAnimal);
  const [petAvailable, setPetAvailable] = useState(
    currentPet.ownerId ? false : true
  );

  const resetForm = () => {
    history.push({
      search: "",
    });
    window.location.reload();
  };
  const handleInput = (e, stateChange) => {
    if (!e.target) {
      setAdoptionStatus(e);
      if (e !== "Available") {
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
      stateChange(e.target.checked);
      setFormInfo({
        ...formInfo,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.type === "file") {
      setPicture(e.target.files[0]);
    } else {
      stateChange(e.target.value);
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
    formInfo.height = parseInt(formInfo.height);
    formInfo.weight = parseInt(formInfo.weight);
    formData.append("data", JSON.stringify(formInfo));
    if (picture) formData.append("picture", picture);
    if (!query.get("pet")) {
      const response = await addPet(formData);
      if (response === "Pet successfully added") {
        setAlertType("success");
        setAlert(response);
        setTimeout(() => {
          setAlert(false);
        }, 10000);
      } else {
        setAlertType("danger");
        setAlert(response);
      }
    } else {
      const response = await updatePet(formData, currentPet._id);
      props.setCurrentPet(response);
      if (response) {
        setAlertType("success");
        setAlert("Pet successfully updated");
        setTimeout(() => {
          setAlert(false);
        }, 10000);
      } else {
        setAlertType("danger");
        setAlert(response);
      }
    }
  };
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Body>
          <h1 className="w-100 text-center">Add a pet</h1>
          <div className="w-100 text-center">
            <button onClick={resetForm}>Reset form</button>
          </div>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group id="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                value={type}
                required
                name="type"
                type="text"
                onChange={(e) => handleInput(e, setType)}
              />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                required
                name="name"
                type="text"
                onChange={(e) => handleInput(e, setName)}
              />
            </Form.Group>
            <Form.Group id="adoption status">
              <Form.Label>Adoption Status</Form.Label>
              <DropdownButton
                variant="info"
                id="dropdown-basic-button"
                onSelect={(e) => handleInput(e)}
                title={adoptionStatus}
                required
              >
                <Dropdown.Item eventKey="Adopted">Adopted</Dropdown.Item>
                <Dropdown.Item eventKey="Fostered">Fostered</Dropdown.Item>
                <Dropdown.Item eventKey="Available">Available</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            {!petAvailable && (
              <Form.Group id="owner">
                <Form.Label>Owner ID</Form.Label>
                <Form.Control
                  required
                  value={ownerId}
                  name="ownerId"
                  type="text"
                  onChange={(e) => handleInput(e, setOwnerId)}
                />
              </Form.Group>
            )}
            <Form.Group id="height">
              <Form.Label>Height(cm)</Form.Label>
              <Form.Control
                required
                value={height}
                name="height"
                type="text"
                onChange={(e) => handleInput(e, setHeight)}
              />
            </Form.Group>
            <Form.Group id="weight">
              <Form.Label>Weight(kg)</Form.Label>
              <Form.Control
                required
                value={weight}
                name="weight"
                type="text"
                onChange={(e) => handleInput(e, setWeight)}
              />
            </Form.Group>
            <Form.Group id="color">
              <Form.Label>Color</Form.Label>
              <Form.Control
                required
                value={color}
                name="color"
                type="text"
                onChange={(e) => handleInput(e, setColor)}
              />
            </Form.Group>
            <Form.Group id="hypoallergenic">
              <Form.Label>Hypoallergenic (check if true)</Form.Label>
              <Form.Check
                value={hypoallergenic}
                name="hypoallergenic"
                type="checkbox"
                onChange={(e) => handleInput(e, setHypoallergenic)}
              />
            </Form.Group>
            <Form.Group id="dietary restrictions">
              <Form.Label>
                Dietary restrictions (leave empty if none)
              </Form.Label>
              <Form.Control
                value={dietaryRestrictions}
                name="dietaryRestrictions"
                type="text"
                onChange={(e) => handleInput(e, setDietaryRestrictions)}
              />
            </Form.Group>
            <Form.Group id="breed of animal">
              <Form.Label>Breed of animal</Form.Label>
              <Form.Control
                value={breedOfAnimal}
                name="breedOfAnimal"
                type="text"
                onChange={(e) => handleInput(e, setBreedOfAnimal)}
                required
              />
            </Form.Group>
            <Form.Group id="picture">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                required={query.get("pet") ? false : true}
                name="picture"
                type="file"
                accept="image/*"
                onChange={(e) => handleInput(e)}
              />
            </Form.Group>
            <Form.Group id="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                required
                value={bio}
                name="bio"
                as="textarea"
                rows={3}
                onChange={(e) => handleInput(e, setBio)}
              />
            </Form.Group>
            {alert && (
              <Alert className="text-center" variant={alertType}>
                {alert}
              </Alert>
            )}
            <Button type="Submit" className="w-100">
              {query.get("pet") ? "Update pet" : "Add pet"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddPet;
