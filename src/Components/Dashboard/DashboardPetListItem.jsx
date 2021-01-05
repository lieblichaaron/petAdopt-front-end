import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { SetCurrentPetContext } from "../../Context";
const DashboardPetListItem = (props) => {
  const history = useHistory();
  const setCurrentPet = useContext(SetCurrentPetContext);

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
      <div>Name: {props.pet.name}</div>
    </ListGroup.Item>
  );
};

export default DashboardPetListItem;
