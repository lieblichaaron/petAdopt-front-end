import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./MyPets.module.scss";
import PetCard from "../PetCard/PetCard";
import { Container, Row, Col } from "react-bootstrap";
import { getUsersPets, getUsersSavedPets } from "../../lib/serverFuncs";

const MyPets = () => {
  const [petsToDisplay, setPetsToDisplay] = useState(null);
  const [currentUsersPets, setCurrentUsersPets] = useState(null);
  const [currentUsersSavedPets, setCurrentUsersSavedPets] = useState(null);

  const changePets = (pets) => {
    setPetsToDisplay(pets);
  };
  useEffect(() => {
    const getCurrentUsersPets = async () => {
      const pets = await getUsersPets("token");
      const savedPets = await getUsersSavedPets("token");
      setPetsToDisplay(pets);
      setCurrentUsersSavedPets(savedPets);
      setCurrentUsersPets(pets);
    };
    getCurrentUsersPets();
  }, []);

  return (
    <div className={styles["page-container"]}>
      {currentUsersPets && (
        <Container className={styles["main-container"]}>
          <Row className={styles["main-row"]}>
            <Col sm={12}>
              {petsToDisplay === currentUsersPets && (
                <div>
                  <h2 className={styles.header}>
                    Check out your saved pets:{" "}
                    <span
                      className={styles["link"]}
                      onClick={() => changePets(currentUsersSavedPets)}
                    >
                      Here
                    </span>{" "}
                  </h2>
                  {currentUsersPets.length === 0 && (
                    <h4>
                      You currently do not own or foster any pets. <br />
                      Looking to Adopt?{" "}
                      <Link className={styles["link"]} to="/petSearch">
                        Find a new pet
                      </Link>
                    </h4>
                  )}
                </div>
              )}
              {petsToDisplay === currentUsersSavedPets && (
                <div>
                  <h2 className={styles.header}>
                    Check out your owned pets:{" "}
                    <span
                      className={styles["link"]}
                      onClick={() => changePets(currentUsersPets)}
                    >
                      Here
                    </span>{" "}
                  </h2>
                  {currentUsersSavedPets.length === 0 && (
                    <h4>
                      No pets saved. <br />
                      Check out some pets on the{" "}
                      <Link className={styles["link"]} to="/petSearch">
                        Pet search page
                      </Link>
                    </h4>
                  )}
                </div>
              )}
            </Col>
            {petsToDisplay.map((pet) => (
              <PetCard key={pet._id} pet={pet} size={5} />
            ))}
          </Row>
        </Container>
      )}
      <footer className={styles.footer}>
        <a href="https://www.freepik.com/photos/woman">
          Woman photo created by wayhomestudio - www.freepik.com
        </a>
      </footer>
    </div>
  );
};

export default MyPets;
