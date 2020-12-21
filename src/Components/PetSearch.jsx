import { UserContext, PetsContext } from "../Context";
import { useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import PetCard from "./PetCard";
import styles from "./PetSearch.module.scss";
import CustomNavbar from "./Navbar";
import BasicSearchBar from "./BasicSearchBar";
import AdvancedSearchBar from "./AdvancedSearchBar";

const Search = (props) => {
  //to access their saved pets
  const { savedPets } = useContext(UserContext);
  const pets = useContext(PetsContext);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchPets, setSearchPets] = useState(null);
  const [filterOption, setFilterOption] = useState("+");
  const switchSearchBar = (e) => {
    e.preventDefault();
    if (filterOption === "+") {
      setFilterOption("-");
      setAdvancedSearch(true);
    } else {
      setFilterOption("+");
      setAdvancedSearch(false);
    }
  };
  return (
    <div className={styles["page-container"]}>
      <CustomNavbar />
      <div className={styles["search-bar-container"]}>
        {advancedSearch ? (
          <AdvancedSearchBar setSearchPets={setSearchPets} />
        ) : (
          <BasicSearchBar setSearchPets={setSearchPets} />
        )}
        <button
          className={styles["filter-select"]}
          onClick={(e) => switchSearchBar(e)}
        >
          More Filters<span>{filterOption}</span>
        </button>
      </div>
      <Container className={`fluid ${styles["main-container"]}`}>
        {true ? (
          <Row className={`justify-content-md-center ${styles["main-row"]}`}>
            {searchPets ? (
              <h1 className="text-center w-100">
                Click on a pet to see more details!
              </h1>
            ) : (
              <h1 className="text-center w-100">
                Please add specification to search!
              </h1>
            )}
            {searchPets &&
              searchPets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  switchPet={props.switchPet}
                  size={2}
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
