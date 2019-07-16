import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import Calc from "./Calc.js";

class DPCalc extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs="8" lg="8">
            <br />
            <h1>Projects I've worked on</h1>
            <p>
              This is an incomplete list of projects that have interested me,
              please get in touch if you'd like to chat further about any of
              these things!
            </p>
            <Calc />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DPCalc;
