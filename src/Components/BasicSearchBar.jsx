import styles from "./SearchBar.module.scss";
import { Dropdown } from "reactjs-dropdown-component";
import { useState, useContext } from "react";
import { PetsContext } from "../Context";

const BasicSearchBar = (props) => {
  const pets = useContext(PetsContext);
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
  const [typeToSearch, setTypeToSearch] = useState("");
  const [animalTypes, setAnimalTypes] = useState(animalTypesArray);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const resetThenSet = (id) => {
    setButtonDisabled(false);
    let temp = JSON.parse(JSON.stringify(animalTypes));
    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;
    setTypeToSearch(temp[id].title);
    setAnimalTypes(temp);
  };
  const search = (e) => {
    e.preventDefault();
    animalTypes.forEach((type) => {
      if (type.selected === true) {
        setTypeToSearch(type.title);
      }
    });
    const animalsToSearch = pets.filter((pet) => pet.type === typeToSearch);
    props.setSearchPets(animalsToSearch);
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
