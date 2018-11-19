import React, { Component, Fragment } from "react";
import Intro from "./Intro/Intro";
import Overview from "./Overview/Overview";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <br />
        <Intro className="left-align" />
        <br />
        <br />
        <Overview className="left-align" />
      </Fragment>
    );
  }
}

export default Home;
