import "./App.css";
import { useState } from "react";
import Navigation from "./Navigation";
import Home from "./Home";
import Sub from "./Sub";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [subroute, setSubroute] = useState("");
  return (
    <Router>
      <div className="App">
        <Navigation subroute={subroute} />
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <Switch>
        <Route path="/:name">
          <Sub setSubroute={setSubroute} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
