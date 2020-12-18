import CustomNavbar from "./Navbar";
import { useContext } from "react";
import { PetContext, UserContext } from "../Context";
import styles from "./PetPage.module.css";
import petPic from "../images/picForProfileSettings.jpg";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const PetPage = () => {
  const pet = useContext(PetContext);
  const user = useContext(UserContext);
  let heart;
  if (user.savedPets.includes(pet.id)) {
    heart = faHeart;
  } else {
    heart = farHeart;
  }
  const confirmChoice = (status) => {
    let text;
    if (status === "return") {
      text = "Are you sure you want to retun your pet to the adoption center?";
    } else if (status === "adopt") {
      text = "Are you sure you want to adopt this pet?";
    } else {
      text = "Are you sure you want to foster this pet?";
    }
    let condition = window.confirm(text);
    changePetStatus(status, condition);
  };
  const changePetStatus = (status, condition) => {
    if (condition && status === "return") {
      // change pet.adoptionStatus to "Looking for a new home"
      // change pet.ownerId to null
      //delete from users pets
    } else if (condition && status === "adopt") {
      // change pet.adoptionStatus to adopted
      // change pet.ownerId to user.id
      // add to users pets
    } else {
      // change pet.status to fostered
      // change pet.ownerId to user.id
      // add to users pets
    }
  };
  const savePet = () => {
    alert("You can see your saved pets in the pet search page!");
    user.savedPets.push(pet.id);
    // put request to user
  };
  return (
    <div>
      <CustomNavbar />
      <h1 className={styles["name"]}>{pet.name}</h1>
      <div className={styles["main-body-container"]}>
        <div className={styles["info-container"]}>
          <div className={styles["facts-container"]}>
            <div className={styles["about-container"]}>
              <h3>About me</h3>
              <div>
                Breed: {pet.type}|{pet.breedOfAnimal}
              </div>
              <div>Height {pet.height}</div>
              <div>Weigth: {pet.weight}</div>
              <div>Color: {pet.color}</div>
              <div>Adoption status: {pet.adoptionStatus}</div>
            </div>
            <div className={styles["med-container"]}>
              <h3>Medical information</h3>
              <div>Hypoallergenic: {pet.hypoallergenic ? "Yes" : "No"}</div>
              <div>
                Dietary Restrictions:{" "}
                {pet.dietaryRestrictions ? pet.dietaryRestrictions : "None"}
              </div>
            </div>
          </div>
          <div className={styles["bio-container"]}>
            <h3>Bio</h3>
            <div>{pet.bio}</div>
          </div>
          <div className="text-center w-100">
            {user.id === pet.ownerID && pet.adoptionStatus === "Fostered" && (
              <Button variant="info" onClick={() => confirmChoice("adopt")}>
                Adopt
              </Button>
            )}
            {!pet.ownerID && (
              <div>
                <Button variant="info" onClick={() => confirmChoice("adopt")}>
                  Adopt
                </Button>
                <Button
                  variant="outline-info"
                  onClick={() => confirmChoice("foster")}
                >
                  Foster
                </Button>
              </div>
            )}
          </div>
          <div className="mt-2 text-center w-100">
            <Button
              title="Save to find pet easily on the search page!"
              variant="outline-primary"
              onClick={savePet}
            >
              <FontAwesomeIcon icon={heart} className={styles.heart} />
            </Button>
          </div>
          <div className="mt-2 text-center w-100">
            {user.id === pet.ownerID && (
              <Button variant="danger" onClick={() => confirmChoice("return")}>
                Return to adoption center
              </Button>
            )}
          </div>
        </div>
        <div className={styles["img-container"]}>
          <img className={styles.img} src={petPic} alt="pet" />
        </div>
      </div>
    </div>
  );
};

export default PetPage;
