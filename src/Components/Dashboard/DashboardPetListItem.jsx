import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { CurrentPetContext } from "../../Context";
const DashboardPetListItem = (props) => {
  const history = useHistory();
  const { setCurrentPet } = useContext(CurrentPetContext);

  const redirectToPetPage = () => {
    setCurrentPet(props.pet);
    history.push({
      pathname: "/petPage",
      search: `?pet=${props.pet._id}`,
    });
  };
  return (
    <ListGroup.Item action variant="secondary" onClick={redirectToPetPage}>
      <div>Pet ID: {props.pet._id}</div>
      <span className="mr-2">Type: {props.pet.type}</span>{" "}
      <span>Name: {props.pet.name}</span>
      <div>Adoption Status: {props.pet.adoptionStatus}</div>
    </ListGroup.Item>
  );
};

export default DashboardPetListItem;
