import { useEffect, useState } from "react";
import { Tab, ListGroup } from "react-bootstrap";
import styles from "./DashboardUserInfo.module.css";
import { getUsersPets } from "../../lib/serverFuncs";
import DashboardPetListItem from "./DashboardPetListItem";

const DashboardUserInfo = (props) => {
  const [pets, setPets] = useState("");

  useEffect(() => {
    const getPets = async () => {
      const pets = await getUsersPets(props.user._id);
      setPets(pets);
    };
    getPets();
  }, []);
  return (
    <Tab.Pane eventKey={`#${props.user._id}`}>
      {pets && (
        <div className={styles["user-info-container"]}>
          <div className={styles["user-info"]}>
            <h3>User Information</h3>
            <div>ID: {props.user._id}</div>
            <div>Name: {props.user.fullName}</div>
            <div>Email: {props.user.email}</div>
            <div>Phone: {props.user.phoneNumber}</div>
            <div>Bio: {props.user.bio}</div>
            <div>Status: {props.user.adminStatus ? "Admin" : "User"}</div>
          </div>
          <div className={styles["user-pets"]}>
            <h3>User's Pets</h3>
            <ListGroup variant="flush">
              {pets.length === 0 && <h4>User has no pets</h4>}
              {pets.map((pet) => (
                <DashboardPetListItem key={pet._id} pet={pet} />
              ))}
            </ListGroup>
          </div>
        </div>
      )}
    </Tab.Pane>
  );
};

export default DashboardUserInfo;
