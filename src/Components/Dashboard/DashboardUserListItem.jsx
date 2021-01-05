import { ListGroup } from "react-bootstrap";

const DashboardUserListItem = (props) => {
  return (
    <ListGroup.Item variant="light" action href={`#${props.user._id}`}>
      <div>ID: {props.user._id}</div>
      <div>Name: {props.user.fullName}</div>
    </ListGroup.Item>
  );
};

export default DashboardUserListItem;
