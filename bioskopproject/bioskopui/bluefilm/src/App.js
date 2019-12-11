import React, { Component } from "react";
import Header from "./components/header";
import Home from "./pages/home";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import ManageAdmin from "./pages/manageadmin";
import ReactSlick from "./support/reactSlict";
import Login from "./pages/login";
import { connect } from "react-redux";
import MovieDetail from "./pages/movie-detail";
import { LoginSuccessAction } from "./redux/actions";
import Axios from "axios";
import { APIURL } from "./support/ApiUrl";
import Belitiket from "./pages/belitiket";

class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    var id = localStorage.getItem("kunci");
    Axios.get(`${APIURL}users/${id}`)
      .then(res => {
        this.props.LoginSuccessAction(res.data);
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    // if (this.state.loading) {
    //   return <div>loading</div>;
    // }
    return (
      <div>
        <Header />
        <Switch>
          <Route path={"/"} exact>
            <ReactSlick />
            <Home />
          </Route>
          <Route path={"/manageadmin"} exact>
            <ManageAdmin />
          </Route>
          <Route path="/moviedetail/:id" component={MovieDetail} exact />
          <Route path="/belitiket" component={Belitiket} exact />
          <Route path={"/login"} exact component={Login} />
        </Switch>
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    AuthLog: state.Auth.login
  };
};

// function App() {
//   return (
//     <div>
//       <Header />
//       <Switch>
//         <Route path={"/"} exact>
//           <ReactSlick />
//           <Home />
//         </Route>
//         <Route>
//           <ManageAdmin />
//         </Route>
//       </Switch>
//     </div>
//   );
// }

export default connect(MapstateToprops, { LoginSuccessAction })(App);
