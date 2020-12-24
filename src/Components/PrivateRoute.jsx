import { Route, Redirect } from "react-router-dom";
import { auth } from "../MockData/Auth";

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return auth.isAuthenticated === true ? children : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
