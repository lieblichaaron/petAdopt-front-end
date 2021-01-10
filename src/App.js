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
import PrivateRoute from "./Components/PrivateRoute";
import AdminRoute from "./Components/AdminRoute";
import { UserContext, CurrentPetContext } from "./Context";
import PetPage from "./Components/PetPage/PetPage";
import AddPet from "./Components/AddPet/AddPet";
import { loginWithToken, getPetById } from "./lib/serverFuncs";
import CustomNavbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Cookie from "js-cookie";
const cookie = Cookie.getJSON("jwt");

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [currentPet, setCurrentPet] = useState();
  const [setupFinished, setSetupFinished] = useState(false);
  const petState = {
    currentPet: currentPet,
    setCurrentPet: setCurrentPet,
  };
  const userState = {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
  };
  let search = window.location.search;
  let query = new URLSearchParams(search);
  useEffect(() => {
    const getUserfromToken = async () => {
      if (!currentUser && cookie) {
        const userFromToken = await loginWithToken(cookie);
        if (typeof userFromToken === "object" && "user" in userFromToken) {
          Cookie.set("jwt", userFromToken.newToken, { expires: 3 });
          setCurrentUser(userFromToken.user);
          if (!currentPet && query.get("pet")) {
            getPetById(query.get("pet")).then((pet) => {
              setCurrentPet(pet);
              setSetupFinished(true);
            });
          } else {
            setSetupFinished(true);
          }
        } else {
          Cookie.remove("jwt");
          setSetupFinished(true);
        }
      } else {
        if (!currentPet && query.get("pet")) {
          getPetById(query.get("pet")).then((pet) => {
            setCurrentPet(pet);
            setSetupFinished(true);
          });
        } else {
          setSetupFinished(true);
        }
      }
    };
    getUserfromToken();
  }, []);
  return (
    <UserContext.Provider value={userState}>
      <CurrentPetContext.Provider value={petState}>
        {setupFinished && (
          <Router>
            <CustomNavbar />
            <Switch>
              <Route exact path="/">
                {cookie ? <Redirect to="/home" /> : <HomepageLoggedOut />}
              </Route>
              <Route path="/petSearch">
                <PetSearch />
              </Route>
              <PrivateRoute path="/home">
                <HomepageLoggedIn />
              </PrivateRoute>

              <Route path="/petPage">{currentPet && <PetPage />}</Route>
              <PrivateRoute path="/myPets">
                <MyPets />
              </PrivateRoute>
              <PrivateRoute path="/profileSettings">
                <ProfileSettings />
              </PrivateRoute>

              <AdminRoute path="/addPet">
                <AddPet />
              </AdminRoute>

              <AdminRoute path="/dashboard">
                <Dashboard />
              </AdminRoute>
            </Switch>
          </Router>
        )}
      </CurrentPetContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
