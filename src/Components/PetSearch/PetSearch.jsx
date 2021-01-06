import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PetCard from "../PetCard/PetCard";
import styles from "./PetSearch.module.scss";
import BasicSearchBar from "../SearchBar/BasicSearchBar";
import AdvancedSearchBar from "../SearchBar/AdvancedSearchBar";
import { getPetsByParams } from "../../lib/serverFuncs";

const Search = () => {
  const history = useHistory();
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [petsToSearch, setPetsToSearch] = useState(null);
  const [filterOption, setFilterOption] = useState("More Filters+");
  const setSearchPets = async (queryParamsObj) => {
    let queryString = "?";
    for (const [key, value] of Object.entries(queryParamsObj)) {
      queryString += `${key}=${value}&`;
    }
    history.push({
      search: queryString,
    });
    const pets = await getPetsByParams(queryParamsObj);
    setPetsToSearch(pets);
  };
  const switchSearchBar = () => {
    if (filterOption === "More Filters+") {
      setFilterOption("Less Filters-");
      setAdvancedSearch(true);
    } else {
      setFilterOption("More Filters+");
      setAdvancedSearch(false);
    }
    history.push({
      search: "",
    });
  };
  useEffect(() => {
    let search = window.location.search;
    const getPetsfromQueryString = async () => {
      if (!petsToSearch && search) {
        const queryParamsObj = Object.fromEntries(
          new URLSearchParams(search.substring(1))
        );
        const pets = await getPetsByParams(queryParamsObj);
        setPetsToSearch(pets);
      }
    };
    getPetsfromQueryString();
  }, []);

  return (
    <div className={styles["page-container"]}>
      <div className={styles["search-bar-container"]}>
        {advancedSearch ? (
          <AdvancedSearchBar sendQueryParams={setSearchPets} />
        ) : (
          <BasicSearchBar sendQueryParams={setSearchPets} />
        )}
        <button className={styles["filter-select"]} onClick={switchSearchBar}>
          {filterOption}
        </button>
      </div>
      <Container className={`fluid ${styles["main-container"]}`}>
        {true ? (
          <Row className={`justify-content-md-center ${styles["main-row"]}`}>
            {petsToSearch && petsToSearch.length > 0 && (
              <h1 className="text-center w-100">
                Click on a pet to see more details!
              </h1>
            )}
            {petsToSearch && petsToSearch.length === 0 && (
              <h1 className="text-center w-100">
                No pets match those specifications :(
              </h1>
            )}
            {!petsToSearch && (
              <h1 className="text-center w-100">
                Please add specification to search!
              </h1>
            )}
            {petsToSearch &&
              petsToSearch.map((pet) => (
                <PetCard key={pet._id} pet={pet} size={2} />
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
