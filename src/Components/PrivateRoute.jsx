import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context";
import Cookie from "js-cookie";
const cookie = Cookie.getJSON("jwt");

const PrivateRoute = ({ children, ...rest }) => {
  const user = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() => {
        return cookie || user ? children : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
