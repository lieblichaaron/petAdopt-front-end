import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./MyPets.module.scss";
import PetCard from "../PetCard/PetCard";
import { Container, Row } from "react-bootstrap";
import { getUsersPets } from "../../lib/serverFuncs";

const MyPets = (props) => {
  const [currentUsersPets, setCurrentUsersPets] = useState(null);
  useEffect(() => {
    const getCurrentUsersPets = async () => {
      const pets = await getUsersPets("token");
      setCurrentUsersPets(pets);
    };
    getCurrentUsersPets();
  }, []);

  return (
    <div className={styles["page-container"]}>
      {currentUsersPets && (
        <Container className={styles["main-container"]}>
          {currentUsersPets.length > 0 ? (
            <Row className={styles["main-row"]}>
              <h1 className="text-center w-100">Check out your pets here!</h1>
              {currentUsersPets.map((pet) => (
                <PetCard
                  key={pet._id}
                  pet={pet}
                  setCurrentPet={props.setCurrentPet}
                  size={5}
                />
              ))}
            </Row>
          ) : (
            <h1>
              You currently do not own or foster any pets. <br />
              Looking to Adopt?
              <Link className={styles["non-owner-link"]} to="/petSearch">
                Find a new pet
              </Link>
            </h1>
          )}
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
