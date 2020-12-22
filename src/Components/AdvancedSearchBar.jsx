import react from "react";
import styles from "./SearchBar.module.scss";
import { Dropdown } from "reactjs-dropdown-component";
import { PetsContext } from "../Context";
import state from "./AdvancedSearchArrays";

class AdvancedSearchBar extends react.Component {
  constructor(props) {
    super(props);
    this.state = state;
    this.specificationsObj = {
      type: "Species",
      adoptionStatus: "Adoption status",
      height: "Height(cm)",
      weight: "Weight(kg)",
    };
  }
  static contextType = PetsContext;
  handleNameChange = (e) => {
    this.setState({
      buttonDisabled: false,
    });
    let name = e.target.value[0]
      ? e.target.value[0].toUpperCase() + e.target.value.substring(1)
      : e.target.value;
    this.setState({
      animalName: name,
    });
  };
  resetThenSet = (id, key) => {
    this.setState({
      buttonDisabled: false,
    });
    let temp = JSON.parse(JSON.stringify(this.state[key]));
    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;
    this.setState({
      [key]: temp,
    });
  };
  search = (e) => {
    e.preventDefault();
    this.state.animalTypes.forEach((type) => {
      if (type.selected === true) {
        this.specificationsObj.type = type.title;
      }
    });
    this.state.adoptionStatus.forEach((status) => {
      if (status.selected === true) {
        this.specificationsObj.adoptionStatus = status.title;
      }
    });
    this.state.animalHeight.forEach((height) => {
      if (height.selected === true) {
        this.specificationsObj.height = height.title;
      }
    });
    this.state.animalWeight.forEach((weight) => {
      if (weight.selected === true) {
        this.specificationsObj.weight = weight.title;
      }
    });
    const animalsToSearch = this.context.filter(
      (pet) =>
        (pet.type === this.specificationsObj.type ||
          this.specificationsObj.type === "Species") &&
        (pet.adoptionStatus === this.specificationsObj.adoptionStatus ||
          this.specificationsObj.adoptionStatus === "Adoption status") &&
        ((pet.height >= parseInt(this.specificationsObj.height.split("-")[0]) &&
          pet.height <=
            parseInt(this.specificationsObj.height.split("-")[1])) ||
          this.specificationsObj.height === "Height(cm)") &&
        ((pet.weight >= parseInt(this.specificationsObj.weight.split("-")[0]) &&
          pet.weight <=
            parseInt(this.specificationsObj.weight.split("-")[1])) ||
          this.specificationsObj.weight === "Weight(kg)") &&
        (pet.name === this.state.animalName || !this.state.animalName)
    );
    this.props.setSearchPets(animalsToSearch);
  };
  render() {
    return (
      <form className={styles.form} onSubmit={(e) => this.search(e)}>
        <Dropdown
          title="Species"
          list={this.state.animalTypes}
          resetThenSet={this.resetThenSet}
        />
        <Dropdown
          title="Adoption status"
          list={this.state.adoptionStatus}
          resetThenSet={this.resetThenSet}
        />
        <Dropdown
          title="Height(cm)"
          list={this.state.animalHeight}
          resetThenSet={this.resetThenSet}
        />
        <Dropdown
          title="Weight(kg)"
          list={this.state.animalWeight}
          resetThenSet={this.resetThenSet}
        />
        <input
          type="text"
          className={styles["name-input"]}
          placeholder="Name"
          value={this.state.animalName}
          onChange={this.handleNameChange}
        />
        <button disabled={this.state.buttonDisabled} className={styles.search}>
          Search
        </button>
      </form>
    );
  }
}

export default AdvancedSearchBar;
