import React, { Component } from "react";
import { connect } from "react-redux";

class Belitiket extends Component {
  state = {};
  render() {
    if (this.props.location.state && this.props.AuthLog) {
      return <div>Beli tiket</div>;
    }
    return <div>404 not found</div>;
  }
}

const MapstateToprops = state => {
  return {
    AuthLog: state.Auth.login
  };
};

export default connect(MapstateToprops)(Belitiket);
