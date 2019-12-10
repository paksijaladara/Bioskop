import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { APIURL } from "../support/ApiUrl";
import { connect } from "react-redux";
import { LoginSuccessAction } from "./../redux/actions";

class Login extends Component {
  state = {
    error: "",
    loading: false
  };

  onLoginClick = () => {
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    Axios.get(`${APIURL}users?username=${username}&password=${password}`)
      .then(res => {
        if (res.data.length) {
          localStorage.setItem(res.data[0].username, res.data[0].id);
          this.props.LoginSuccessAction(res.data[0]);
        } else {
          this.setState({ error: "salah masukin pass woy" });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.props.AuthLog) {
      return <Redirect to={"/"} />;
    }
    return (
      <div>
        <div className=" mt-3 d-flex justify-content-center">
          <div
            style={{ width: "500px", border: "1px solid black" }}
            className="rounded p-2"
          >
            <h1>Login</h1>
            <div className="p-1" style={{ borderBottom: "1px solid black" }}>
              <input
                type="text"
                className="username"
                style={{
                  border: "transparent",
                  width: "100%",
                  fontSize: "20px"
                }}
                ref="username"
                placeholder="username bro"
              />
            </div>
            <div className="p-1" style={{ borderBottom: "1px solid black" }}>
              <input
                type="password"
                className="username"
                style={{
                  border: "transparent",
                  width: "100%",
                  fontSize: "20px"
                }}
                ref="password"
                placeholder="pass bro"
              />
            </div>
            {this.state.error === "" ? null : (
              <div className="alert alert-danger mt-2">
                {this.state.error}{" "}
                <span
                  onClick={() => this.setState({ error: "" })}
                  className="float-right font-weight-bold"
                >
                  X
                </span>
              </div>
            )}
            <div className="mt-4">
              <button className="btn btn-primary" onClick={this.onLoginClick}>
                Login
              </button>
            </div>
            <div className="mt-2">
              belum ada akun ?<Link> Register </Link> aja mbak/mas
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    AuthLog: state.Auth.login
  };
};

export default connect(MapstateToprops, { LoginSuccessAction })(Login);
