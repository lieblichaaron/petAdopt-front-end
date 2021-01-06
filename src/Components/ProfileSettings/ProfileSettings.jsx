import styles from "./ProfileSettings.module.css";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { getUsersPets, baseUrl, updateUser } from "../../lib/serverFuncs";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context";
import defaultPic from "../../images/picForHomepage.jpg";

const ProfileSettings = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const formFields = {
    fullName: currentUser.fullName,
    email: currentUser.email,
    password: "",
    phoneNumber: currentUser.phoneNumber,
    bio: currentUser.bio,
  };
  const [formInfo, setFormInfo] = useState(formFields);
  const [name, setName] = useState(currentUser.fullName);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState(currentUser.phoneNumber);
  const [bio, setBio] = useState(currentUser.bio);
  const [alertType, setAlertType] = useState("");
  const [alert, setAlert] = useState(false);
  const [petPicture, setPetPicture] = useState("");
  const [defaultPetPicture, setDefaultPetPicture] = useState(false);

  const displayMsg = (errorMsg) => {
    setAlert(errorMsg);
    setTimeout(() => {
      setAlert("");
    }, 5000);
  };

  const handleInput = (e, setState) => {
    if (e.target.name === "password confirmation") {
      setPasswordConfirmation(e.target.value);
    } else {
      setState(e.target.value);
      setFormInfo({
        ...formInfo,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordConfirmation !== password) {
      setAlertType("danger");
      displayMsg("Passwords do not match");
      return;
    }
    if (!formInfo.password) {
      delete formInfo.password;
    }
    const newUserInfo = await updateUser(formInfo, currentUser._id);
    setCurrentUser(newUserInfo);
    setAlertType("success");
    displayMsg("Update successful");
  };
  useEffect(() => {
    const getPetPicture = async () => {
      const usersPets = await getUsersPets(currentUser._id);
      if (usersPets.length > 0) {
        setPetPicture(usersPets[0].picture);
      } else {
        setDefaultPetPicture(true);
      }
    };
    getPetPicture();
  }, []);

  return (
    <div className={styles["main-body-container"]}>
      <div className={styles["main-body-pic"]}>
        {petPicture && (
          <img
            className={styles.img}
            src={`${baseUrl}${petPicture}`}
            alt="pet"
          />
        )}
        {defaultPetPicture && (
          <img className={styles.img} src={defaultPic} alt="pet" />
        )}
      </div>
      <Card className={styles.card}>
        <Card.Body>
          <h1>Update your information!</h1>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group id="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="fullName"
                onChange={(e) => handleInput(e, setName)}
                value={name}
                type="name"
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                onChange={(e) => handleInput(e, setEmail)}
                value={email}
                type="email"
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>
                New Password (leave empty to keep unchanged)
              </Form.Label>
              <Form.Control
                name="password"
                value={password}
                onChange={(e) => handleInput(e, setPassword)}
                type="password"
              />
            </Form.Group>
            <Form.Group id="password confirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                name="password confirmation"
                value={passwordConfirmation}
                onChange={(e) => handleInput(e)}
                type="password"
              />
            </Form.Group>
            <Form.Group id="phone-number">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                name="phoneNumber"
                onChange={(e) => handleInput(e, setPhone)}
                value={phone}
                type="phone-number"
              />
            </Form.Group>
            <Form.Group id="bio">
              <Form.Label>Add a bio</Form.Label>
              <Form.Control
                name="bio"
                onChange={(e) => handleInput(e, setBio)}
                value={bio}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            {alert && (
              <Alert className="text-center" variant={alertType}>
                {alert}
              </Alert>
            )}
            <Button type="Submit" className="w-100">
              Save changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileSettings;
