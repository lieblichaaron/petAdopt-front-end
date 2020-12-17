import { Col } from "react-bootstrap";
import styles from "./PetCard.module.css";
import Picture from "../images/picForProfileSettings.jpg";
import { useHistory } from "react-router-dom";

const PetCard = (props) => {
  const history = useHistory();
  const redirectToPetPage = (id) => {
    props.switchPet(id);
    history.push("/petPage");
  };
  return (
    <Col
      lg={5}
      className={styles["card-container"]}
      onClick={() => redirectToPetPage(props.pet.id)}
    >
      <div className={styles["pic-container"]}>
        <img src={Picture} alt="pet picture" className={styles["card-pic"]} />
      </div>
      <h3>{props.pet.name}</h3>
      <h5>
        {props.pet.type}|{props.pet.breedOfAnimal}
      </h5>
      <h5>
        {props.pet.adoptionStatus
          ? props.pet.adoptionStatus
          : "Looking for a home"}
      </h5>
      <div className={styles["more-details"]}>View more details</div>
    </Col>
  );
};

export default PetCard;
