import React, { useState } from "react";
import "./App.css";
import "fontsource-roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./Components/About";
import PetSearch from "./Components/PetSearch";
import HomepageLoggedOut from "./Components/HomepageLoggedOut";
import HomepageLoggedIn from "./Components/HomepageLoggedIn";
import MyPets from "./Components/MyPets";
import ProfileSettings from "./Components/ProfileSettings";
import users from "./MockData/Users.json";
import PrivateRoute from "./Components/PrivateRoute";
import { MyContext } from "./Context";
function App() {
  const [user, setUser] = useState(users[0]);

  return (
    <MyContext.Provider value={user}>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomepageLoggedOut />
          </Route>
          <PrivateRoute path="/home">
            <HomepageLoggedIn />
          </PrivateRoute>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/petSearch">
            <PetSearch />
          </Route>
          <PrivateRoute path="/myPets">
            <MyPets />
          </PrivateRoute>
          <PrivateRoute path="/profileSettings">
            <ProfileSettings />
          </PrivateRoute>
        </Switch>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
