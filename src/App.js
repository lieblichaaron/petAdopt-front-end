import React, { useState } from "react";
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
import users from "./MockData/Users.json";
import pets from "./MockData/Pets.json";
import PrivateRoute from "./Components/PrivateRoute";
import AdminRoute from "./Components/AdminRoute";
import { UserContext, CurrentPetContext, PetsContext } from "./Context";
import PetPage from "./Components/PetPage/PetPage";
import AddPet from "./Components/AddPet/AddPet";
import { loginWithToken } from "./lib/serverFuncs";
import Cookie from "js-cookie";
const cookie = Cookie.getJSON("jwt");

function App() {
  let petsObj = {};
  pets.forEach((pet) => {
    petsObj[pet.id] = pet;
  });
  let usersObj = {};
  users.forEach((user) => {
    usersObj[user.id] = user;
  });
  const [currentUser, setCurrentUser] = useState();
  const [pet, setPet] = useState(petsObj[1]);
  const changePetState = (petId) => {
    setPet(petsObj[petId]);
  };
  if (!currentUser) {
    loginWithToken().then((userFromToken) => {
      if (userFromToken) {
        setCurrentUser(userFromToken);
      } else {
        Cookie.remove("jwt");
      }
    });
  }
  return (
    <UserContext.Provider value={currentUser}>
      <CurrentPetContext.Provider value={pet}>
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
              <PrivateRoute path="/home">
                <HomepageLoggedIn setCurrentUser={setCurrentUser} />
              </PrivateRoute>
              <Route path="/petSearch">
                <PetSearch switchPet={changePetState} />
              </Route>
              <Route path="/petPage">
                <PetPage />
              </Route>
              <PrivateRoute path="/myPets">
                <MyPets switchPet={changePetState} />
              </PrivateRoute>
              <PrivateRoute path="/profileSettings">
                <ProfileSettings />
              </PrivateRoute>
              <AdminRoute path="/addPet">
                <AddPet />
              </AdminRoute>
            </Switch>
          </Router>
        </PetsContext.Provider>
      </CurrentPetContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
