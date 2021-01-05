import styles from "./ProfileSettings.module.css";
import { Form, Button, Card } from "react-bootstrap";
import petPic from "../../images/picForProfileSettings.jpg";
import { getUsersPets } from "../../lib/serverFuncs";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context";
const ProfileSettings = () => {
  const user = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (user) {
      getUsersPets(user._id).then((res) => {});
    }
  }, []);
  return (
    <div className={styles["main-body-container"]}>
      <div className={styles["main-body-pic"]}>
        {/* make this background a rotating album of the users pets if they have any */}
        <img className={styles.img} src={petPic} alt="pet" />
      </div>
      <Card className={styles.card}>
        <Card.Body>
          <h1>Update your information!</h1>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group id="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="name" />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group id="phone-number">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="phone-number" />
            </Form.Group>
            <Form.Group id="bio">
              <Form.Label>Add a bio</Form.Label>
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

export default ProfileSettings;
