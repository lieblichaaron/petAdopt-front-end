import React, { useState } from "react";
import "./App.css";
import "fontsource-roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PetSearch from "./Components/PetSearch/PetSearch";
import HomepageLoggedOut from "./Components/HomePageOut/HomepageLoggedOut";
import HomepageLoggedIn from "./Components/HomePageIn/HomepageLoggedIn";
import MyPets from "./Components/MyPets/MyPets";
import ProfileSettings from "./Components/ProfileSettings/ProfileSettings";
import users from "./MockData/Users.json";
import pets from "./MockData/Pets.json";
import PrivateRoute from "./Components/PrivateRoute";
import { UserContext, CurrentPetContext, PetsContext } from "./Context";
import PetPage from "./Components/PetPage/PetPage";
import AddPet from "./Components/AddPet/AddPet";

function App() {
  let petsObj = {};
  pets.forEach((pet) => {
    petsObj[pet.id] = pet;
  });
  let usersObj = {};
  users.forEach((user) => {
    usersObj[user.id] = user;
  });
  const [currentUserId, setCurrentUserId] = useState(null);
  const [pet, setPet] = useState(petsObj[1]);
  const changePetState = (petId) => {
    setPet(petsObj[petId]);
  };
  return (
    <UserContext.Provider value={currentUserId}>
      <CurrentPetContext.Provider value={pet}>
        <PetsContext.Provider value={pets}>
          <Router>
            <Switch>
              <Route exact path="/">
                <HomepageLoggedOut setCurrentUserId={setCurrentUserId} />
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
