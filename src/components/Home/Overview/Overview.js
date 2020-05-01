import React, { Component } from "react";
import { Button, Jumbotron, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./Overview.css";
import vtc_fade from "../../../assets/img/vtc_fade.gif";
class Overview extends Component {
  render() {
    return (
      <Container>
        <Jumbotron>
          <Row>
            <Col xs="12" lg="12">
              <h3>How does the brain make sense of the visual world?</h3>
              <p>
                I study the primate visual system with a combination of fMRI and
                deep convolutional neural network modeling. I'm especially
                interested in the functional architecture of visual cortex (the
                relationship between a neuron's location and the computations it
                supports) and the development of that architecture over the
                lifespan.
              </p>
              <Link to="/Research">
                <Button size="lg" color="secondary">
                  My Research
                </Button>
              </Link>
              {` `}
              <Link to="/CV">
                <Button size="lg" color="secondary">
                  My CV
                </Button>
              </Link>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs="6" lg="4">
              <img
                src={vtc_fade}
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
              <p>
                To learn more about these data and object representations in
                human visual cortex, check out {` `}
                <a href="https://www.jneurosci.org/content/40/15/3008">
                  our article in the Journal of Neuroscience!
                </a>
              </p>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    );
  }
}

export default Overview;
