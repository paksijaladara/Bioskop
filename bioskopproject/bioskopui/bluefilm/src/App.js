import React from "react";
import Header from "./components/header";
import Home from "./pages/home";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import ManageAdmin from "./pages/manageadmin";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path={"/"} exact>
          <Home />
        </Route>
        <Route>
          <ManageAdmin />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
