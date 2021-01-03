import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context";
const AdminRoute = ({ children, ...rest }) => {
  const currentUser = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() => {
        return currentUser && currentUser.adminStatus === true ? (
          children
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default AdminRoute;
