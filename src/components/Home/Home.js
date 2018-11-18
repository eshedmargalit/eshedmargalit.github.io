import React, { Component, Fragment } from "react";
import Intro from "../Intro/Intro";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <br />
        <Intro className="left-align" />
        <br />
        <br />
      </Fragment>
    );
  }
}

export default Home;
