import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import WeatherForecast from "./components/weather-forecast/WeatherForecast";
import History from "./components/weather-history/History";
import Profile from "./components/profile/Profile";
import Overview from "./components/main-page/Overview";

function App() {
  const [selectedPlace, setSelectedPlace] = useState("");

  return (
    <Router>
      <div className="row-start">
        <Navigation place={selectedPlace} />
        <Route path="/" exact component={() => <Overview setSelectedPlace={setSelectedPlace}/>} />
        <Route
          path="/places/:place"
          component={WeatherForecast}
        />
        <Route path="/history/:place" component={History} />
        <Route path="/profile" component={Profile} />
      </div>
    </Router>
  );
}

export default App;
