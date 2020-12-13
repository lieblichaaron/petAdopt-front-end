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

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* condition based on login info */}
          {false ? <HomepageLoggedOut /> : <HomepageLoggedIn />}
        </Route>
        <Route path="/About">
          <About />
        </Route>
        <Route path="/PetSearch">
          <PetSearch />
        </Route>
        <Route path="/MyPets">
          <MyPets />
        </Route>
        <Route path="/ProfileSettings">
          <ProfileSettings />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
