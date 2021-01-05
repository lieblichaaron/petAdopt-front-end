import { Tab } from "react-bootstrap";

const DashboardUserInfo = (props) => {
  return (
    <Tab.Pane eventKey={`#${props.user._id}`}>
      <h3>User Information</h3>
      <div>ID: {props.user._id}</div>
      <div>Name: {props.user.fullName}</div>
      <div>Email: {props.user.email}</div>
      <div>Phone: {props.user.phoneNumber}</div>
      <div>Bio: {props.user.bio}</div>
      <div>Admin Status: {props.user.adminStatus ? "Admin" : "User"}</div>
    </Tab.Pane>
  );
};

export default DashboardUserInfo;
