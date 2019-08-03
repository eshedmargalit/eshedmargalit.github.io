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
            <h1>d-prime Calculator</h1>
            <Calc />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DPCalc;
