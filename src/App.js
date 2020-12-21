import React, { useState } from "react";
import "./App.css";
import "fontsource-roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PetSearch from "./Components/PetSearch";
import HomepageLoggedOut from "./Components/HomepageLoggedOut";
import HomepageLoggedIn from "./Components/HomepageLoggedIn";
import MyPets from "./Components/MyPets";
import ProfileSettings from "./Components/ProfileSettings";
import users from "./MockData/Users.json";
import pets from "./MockData/Pets.json";
import PrivateRoute from "./Components/PrivateRoute";
import { UserContext, CurrentPetContext, PetsContext } from "./Context";
import PetPage from "./Components/PetPage";
import AddPet from "./Components/AddPet";

function App() {
  let petsObj = {};
  pets.forEach((pet) => {
    petsObj[pet.id] = pet;
  });
  let usersObj = {};
  users.forEach((user) => {
    usersObj[user.id] = user;
  });
  const [user, setUser] = useState(usersObj[1]);
  const [pet, setPet] = useState(petsObj[1]);
  const changePetState = (petId) => {
    setPet(petsObj[petId]);
  };
  return (
    <UserContext.Provider value={user}>
      <CurrentPetContext.Provider value={pet}>
        <PetsContext.Provider value={pets}>
          <Router>
            <Switch>
              <Route exact path="/">
                <HomepageLoggedOut />
              </Route>
              <PrivateRoute path="/home">
                <HomepageLoggedIn />
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
              <PrivateRoute path="/addPet">
                <AddPet />
              </PrivateRoute>
            </Switch>
          </Router>
        </PetsContext.Provider>
      </CurrentPetContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
