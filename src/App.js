import React, { useState, useEffect } from "react";
import "./App.css";
import "fontsource-roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PetSearch from "./Components/PetSearch/PetSearch";
import HomepageLoggedOut from "./Components/HomePageOut/HomepageLoggedOut";
import HomepageLoggedIn from "./Components/HomePageIn/HomepageLoggedIn";
import MyPets from "./Components/MyPets/MyPets";
import ProfileSettings from "./Components/ProfileSettings/ProfileSettings";
import pets from "./MockData/Pets.json";
import PrivateRoute from "./Components/PrivateRoute";
import AdminRoute from "./Components/AdminRoute";
import { UserContext, CurrentPetContext, PetsContext } from "./Context";
import PetPage from "./Components/PetPage/PetPage";
import AddPet from "./Components/AddPet/AddPet";
import { loginWithToken, getPetById } from "./lib/serverFuncs";
import Cookie from "js-cookie";
const cookie = Cookie.getJSON("jwt");

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [currentPet, setCurrentPet] = useState();
  let search = window.location.search;
  let query = new URLSearchParams(search);
  useEffect(() => {
    if (!currentUser && cookie) {
      loginWithToken().then((userFromToken) => {
        if (userFromToken) {
          setCurrentUser(userFromToken);
        } else {
          Cookie.remove("jwt");
        }
      });
    }

    if (!currentPet && query.get("pet")) {
      getPetById(query.get("pet")).then((pet) => {
        setCurrentPet(pet);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={currentUser}>
      <CurrentPetContext.Provider value={currentPet}>
        <PetsContext.Provider value={pets}>
          <Router>
            <Switch>
              <Route exact path="/">
                {cookie ? (
                  <Redirect to="/home" />
                ) : (
                  <HomepageLoggedOut setCurrentUser={setCurrentUser} />
                )}
              </Route>
              <Route path="/petSearch">
                <PetSearch setCurrentPet={setCurrentPet} />
              </Route>
              {currentUser || cookie ? (
                <div>
                  <PrivateRoute path="/home">
                    <HomepageLoggedIn setCurrentUser={setCurrentUser} />
                  </PrivateRoute>

                  <Route path="/petPage">
                    {currentPet && <PetPage setCurrentPet={setCurrentPet} />}
                  </Route>
                  <PrivateRoute path="/myPets">
                    <MyPets setCurrentPet={setCurrentPet} />
                  </PrivateRoute>
                  <PrivateRoute path="/profileSettings">
                    <ProfileSettings />
                  </PrivateRoute>
                  <AdminRoute path="/addPet">
                    <AddPet setCurrentPet={setCurrentPet} />
                  </AdminRoute>
                </div>
              ) : (
                <Redirect to="/" />
              )}
            </Switch>
          </Router>
        </PetsContext.Provider>
      </CurrentPetContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
