import React, { Component, Fragment } from "react";
import { Container } from "reactstrap";
import Intro from "./Intro/Intro";
import Overview from "./Overview/Overview";
import FeaturedProjects from "./FeaturedProjects/FeaturedProjects";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <br />
        <Intro className="left-align" />
        <br />
        <Container>
          <hr />
        </Container>
        <Overview className="left-align" />
        <Container>
          <hr />
        </Container>
        <FeaturedProjects className="left-align" />
      </Fragment>
    );
  }
}

export default Home;
