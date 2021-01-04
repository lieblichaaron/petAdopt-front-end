import react from "react";
import styles from "./SearchBar.module.scss";
import { Dropdown } from "reactjs-dropdown-component";
import state from "./AdvancedSearchArrays";
import { getPetsByParams } from "../../lib/serverFuncs";

class AdvancedSearchBar extends react.Component {
  constructor(props) {
    super(props);
    this.state = state;
    this.specificationsObj = {
      type: "Species",
      adoptionStatus: "Adoption status",
      height: "Height(cm)",
      weight: "Weight(kg)",
      name: "",
    };
  }
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
  search = async (e) => {
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
    this.specificationsObj.name = this.state.animalName;
    if (this.specificationsObj.type === "Species")
      delete this.specificationsObj.type;
    if (this.specificationsObj.adoptionStatus === "Adoption status")
      delete this.specificationsObj.adoptionStatus;
    if (this.specificationsObj.height === "Height(cm)")
      delete this.specificationsObj.height;
    if (this.specificationsObj.weight === "Weight(kg)")
      delete this.specificationsObj.weight;
    if (!this.specificationsObj.name) delete this.specificationsObj.name;
    const animalsToSearch = await getPetsByParams(this.specificationsObj);
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
