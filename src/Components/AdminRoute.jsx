import { Route, Redirect } from "react-router-dom";
import { auth } from "../MockData/Auth";

const AdminRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return auth.isAdmin == true ? children : <Redirect to="/" />;
      }}
    />
  );
};

export default AdminRoute;
