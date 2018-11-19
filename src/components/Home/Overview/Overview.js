import React, { Component } from "react";
import { Button, Jumbotron, Container, Row, Col } from "reactstrap";
import "./Overview.css";

import vtc_gif from "../../../img/vtc_fade.gif";

class Overview extends Component {
  render() {
    return (
      <Container>
        <Jumbotron>
          <Row>
            <Col xs="12" lg="12">
              <h3>How does the brain make sense of the things we see?</h3>
              <p>
                I study the functional architecture of the primate visual
                system, with an interest in describing and modeling the
                computations that govern visual cortex and the representations
                that they operate on. I hope to contribute to our understanding
                of how information is transformed in neural networks and how
                such networks develop. Click below to read more about projects
                I've worked on in the past!
              </p>
              <Button size="lg" color="secondary" to="/">
                My Research
              </Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs="6" lg="4">
              <img
                src={vtc_gif}
                className="full-width"
                alt="GIF cycling through fMRI data from human ventral temporal cortex"
              />
            </Col>
            <Col xs="12" lg="6">
              <p>
                Stimulus preference maps in human higher visual cortex acquired
                at sub-millimeter resolution. The animation cycles through
                preference maps for four object categories: faces, places,
                words, and bodies. Can you tell which is which?
              </p>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    );
  }
}

export default Overview;
