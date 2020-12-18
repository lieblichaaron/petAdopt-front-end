import { useContext } from "react";
import CustomNavbar from "./Navbar";
import { Link } from "react-router-dom";
import styles from "./MyPets.module.scss";
import { UserContext } from "../Context";
import PetCard from "./PetCard";
import { Container, Row } from "react-bootstrap";

const MyPets = (props) => {
  const { pets } = useContext(UserContext);
  return (
    <div className={styles["page-container"]}>
      <CustomNavbar />
      <Container className={styles["main-container"]}>
        {pets ? (
          <Row className={styles["main-row"]}>
            <h1 className="text-center w-100">Check out your pets here!</h1>
            {pets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                switchPet={props.switchPet}
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
      <footer className={styles.footer}>
        <a href="https://www.freepik.com/photos/woman">
          Woman photo created by wayhomestudio - www.freepik.com
        </a>
      </footer>
    </div>
  );
};

export default MyPets;
