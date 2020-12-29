import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context";
const AdminRoute = ({ children, ...rest }) => {
  const user = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() => {
        return /*user.adminStatus ===*/ true ? children : <Redirect to="/" />;
      }}
    />
  );
};

export default AdminRoute;
