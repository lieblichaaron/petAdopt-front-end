import styles from "./SearchBar.module.scss";
import { Dropdown } from "reactjs-dropdown-component";
import { useState } from "react";

const BasicSearchBar = (props) => {
  let animalTypesArray = [
    {
      id: 0,
      title: "Dog",
      selected: false,
      key: "animal",
    },
    {
      id: 1,
      title: "Cat",
      selected: false,
      key: "animal",
    },
  ];
  let searchParams = {
    type: "",
  };
  const [typeToSearch, setTypeToSearch] = useState("");
  const [animalTypes, setAnimalTypes] = useState(animalTypesArray);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const resetThenSet = (id) => {
    setButtonDisabled(false);
    let tempAnimalTypesArry = JSON.parse(JSON.stringify(animalTypes));
    tempAnimalTypesArry.forEach((animalType) => (animalType.selected = false));
    tempAnimalTypesArry[id].selected = true;
    setAnimalTypes(tempAnimalTypesArry);
    setTypeToSearch(tempAnimalTypesArry[id].title);
  };
  const search = async (e) => {
    e.preventDefault();
    searchParams.type = typeToSearch;
    props.sendQueryParams(searchParams);
  };
  return (
    <form className={styles.form} onSubmit={(e) => search(e)}>
      <Dropdown
        title="Species"
        list={animalTypes}
        resetThenSet={resetThenSet}
      />
      <button disabled={buttonDisabled} className={styles.search}>
        Search
      </button>
    </form>
  );
};

export default BasicSearchBar;
