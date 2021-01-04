import react from "react";
import styles from "./SearchBar.module.scss";
import { Dropdown } from "reactjs-dropdown-component";
import state from "./AdvancedSearchArrays";

class AdvancedSearchBar extends react.Component {
  constructor(props) {
    super(props);
    this.state = state;
    this.queryParams = {};
    this.dropdownTitles = [
      "Species",
      "Adoption status",
      "Height(cm)",
      "Weight(kg)",
    ];
  }
  handleNameChange = (e) => {
    this.setState({
      buttonDisabled: false,
    });
    let name = e.target.value[0]
      ? e.target.value[0].toUpperCase() + e.target.value.substring(1)
      : e.target.value;
    this.setState({
      name: name,
    });
    this.queryParams.name = name;
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
    if (!this.dropdownTitles.includes(temp[id].title)) {
      this.queryParams[key] = temp[id].title;
    } else {
      delete this.queryParams[key];
    }
  };
  search = async (e) => {
    e.preventDefault();
    this.props.sendQueryParams(this.queryParams);
  };
  render() {
    return (
      <form className={styles.form} onSubmit={(e) => this.search(e)}>
        <Dropdown
          title="Species"
          list={this.state.type}
          resetThenSet={this.resetThenSet}
        />
        <Dropdown
          title="Adoption status"
          list={this.state.adoptionStatus}
          resetThenSet={this.resetThenSet}
        />
        <Dropdown
          title="Height(cm)"
          list={this.state.height}
          resetThenSet={this.resetThenSet}
        />
        <Dropdown
          title="Weight(kg)"
          list={this.state.weight}
          resetThenSet={this.resetThenSet}
        />
        <input
          type="text"
          className={styles["name-input"]}
          placeholder="Name"
          value={this.state.name}
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
