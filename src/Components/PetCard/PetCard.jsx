import { useContext } from "react";
import { CurrentPetContext } from "../../Context";
import { Col } from "react-bootstrap";
import styles from "./PetCard.module.css";
import { useHistory } from "react-router-dom";

const PetCard = (props) => {
  const history = useHistory();
  const { setCurrentPet } = useContext(CurrentPetContext);

  const redirectToPetPage = (pet) => {
    setCurrentPet(pet);
    history.push({
      pathname: "/petPage",
      search: `?pet=${props.pet._id}`,
    });
  };
  return (
    <Col
      sm={props.size}
      className={styles["card-container"]}
      onClick={() => redirectToPetPage(props.pet)}
    >
      <div className={styles["pic-container"]}>
        <img src={props.pet.picture} alt="pet" className={styles["card-pic"]} />
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
