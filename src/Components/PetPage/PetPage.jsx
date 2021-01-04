import CustomNavbar from "../Navbar/Navbar";
import { useContext, useState } from "react";
import { CurrentPetContext, UserContext } from "../../Context";
import styles from "./PetPage.module.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as clearHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as coloredHeart } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import {
  changeSavedPets,
  baseUrl,
  changeAdoptionStatus,
} from "../../lib/serverFuncs";
const PetPage = (props) => {
  const history = useHistory();
  const currentPet = useContext(CurrentPetContext);
  const currentUser = useContext(UserContext);
  let heartOnLoad;
  if (
    currentPet &&
    currentUser &&
    currentPet.savedBy.includes(currentUser._id)
  ) {
    heartOnLoad = coloredHeart;
  } else {
    heartOnLoad = clearHeart;
  }
  const [heart, setHeart] = useState(heartOnLoad);
  const editPet = () => {
    history.push({
      pathname: "/addPet",
      search: `?pet=${currentPet._id}`,
    });
  };
  const confirmChoice = async (status) => {
    if (!currentUser) {
      console.log("no");
      history.push({
        pathname: "/",
      });
      return;
    }
    let text;
    if (status === "Looking for a new home") {
      text = "Are you sure you want to retun your pet to the adoption center?";
    } else if (status === "Adopted") {
      text = "Are you sure you want to adopt this pet?";
    } else {
      text = "Are you sure you want to foster this pet?";
    }
    confirmAlert({
      title: "Confirm",
      message: text,
      buttons: [
        {
          label: "Yes",
          onClick: () => changePetStatus(status),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const changePetStatus = async (status) => {
    const newPetInfo = await changeAdoptionStatus(currentPet._id, status);
    props.setCurrentPet(newPetInfo);
  };
  const savePet = async () => {
    if (!currentUser) {
      console.log("no");
      history.push({
        pathname: "/",
      });
      return;
    }
    await changeSavedPets(currentPet._id);
    if (heart === clearHeart) {
      setHeart(coloredHeart);
    } else {
      setHeart(clearHeart);
    }
  };
  return (
    <div>
      <h1 className={styles["name"]}>{currentPet.name}</h1>
      <div className={styles["main-body-container"]}>
        <div className={styles["info-container"]}>
          <div className={styles["facts-container"]}>
            <div className={styles["about-container"]}>
              <h3>About me</h3>
              <div>
                Breed: {currentPet.type}|{currentPet.breedOfAnimal}
              </div>
              <div>Height {currentPet.height}</div>
              <div>Weigth: {currentPet.weight}</div>
              <div>Color: {currentPet.color}</div>
              <div>Adoption status: {currentPet.adoptionStatus}</div>
            </div>
            <div className={styles["med-container"]}>
              <h3>Medical information</h3>
              <div>
                Hypoallergenic: {currentPet.hypoallergenic ? "Yes" : "No"}
              </div>
              <div>
                Dietary Restrictions:{" "}
                {currentPet.dietaryRestrictions
                  ? currentPet.dietaryRestrictions
                  : "None"}
              </div>
            </div>
          </div>
          <div className={styles["bio-container"]}>
            <h3>Bio</h3>
            <div>{currentPet.bio}</div>
          </div>
          <div className="text-center w-100">
            {currentPet.adoptionStatus === "Fostered" && (
              <Button variant="info" onClick={() => confirmChoice("Adopted")}>
                Adopt
              </Button>
            )}
            {!currentPet.ownerId && (
              <div>
                <Button variant="info" onClick={() => confirmChoice("Adopted")}>
                  Adopt
                </Button>
                <Button
                  variant="outline-info"
                  onClick={() => confirmChoice("Fostered")}
                >
                  Foster
                </Button>
              </div>
            )}
          </div>

          <div className="mt-2 text-center w-100">
            <Button variant="outline-primary" onClick={savePet}>
              <FontAwesomeIcon icon={heart} className={styles.heart} />
            </Button>
          </div>

          {currentUser && currentUser._id === currentPet.ownerId && (
            <div className="mt-2 text-center w-100">
              <Button
                variant="danger"
                onClick={() => confirmChoice("Looking for a new home")}
              >
                Return to adoption center
              </Button>
            </div>
          )}
          <div className="mt-2 text-center w-100">
            {currentUser && currentUser.adminStatus && (
              <Button variant="info" onClick={editPet}>
                Edit pet information
              </Button>
            )}
          </div>
        </div>
        <div className={styles["img-container"]}>
          <img
            className={styles.img}
            src={`${baseUrl}${currentPet.picture}`}
            alt="pet"
          />
        </div>
      </div>
    </div>
  );
};

export default PetPage;
