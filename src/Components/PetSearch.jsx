import { UserContext } from "../Context";
import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import PetCard from "./PetCard";
import styles from "./PetSearch.module.scss";
import CustomNavbar from "./Navbar";
const Search = (props) => {
  //to access their saved pets
  const { savedPets } = useContext(UserContext);
  return (
    <div className={styles["page-container"]}>
      <CustomNavbar />
      <Container className={styles["main-container"]}>
        {true ? (
          <Row className={`justify-content-md-center ${styles["main-row"]}`}>
            <h1 className="text-center w-100">
              Click on a pet to see more details!
            </h1>
            {props.pets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                switchPet={props.switchPet}
                size={3}
              />
            ))}
          </Row>
        ) : (
          <h1>Start your search by entering in some specifications!</h1>
        )}
      </Container>
      <footer className={styles.footer}>
        <a href="https://www.freepik.com/photos/background">
          Background photo created by senivpetro - www.freepik.com
        </a>
      </footer>
    </div>
  );
};

export default Search;
