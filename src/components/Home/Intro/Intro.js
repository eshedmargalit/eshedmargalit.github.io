import React, { Component } from "react";
import { Container, Row, Col, Button, UncontrolledTooltip } from "reactstrap";
import { FaGoogle, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import snail_logo from "../../../img/snail-sq.png";
import vpnl_logo from "../../../img/vpnl.png";
import splash from "../../../img/clouds_rest.jpg";
import { Link } from "react-router-dom";

import "./Intro.css";

class Intro extends Component {
  render() {
    const ICON_SIZE = "2em";
    const ICON_COLOR = "#8c1313";

    return (
      <Container className="vertical-align">
        <Row className="vertical-align">
          <Col xs="12" lg="4">
            <h1>Eshed Margalit</h1>
            <h5>
              PhD Candidate in the{" "}
              <a href="https://med.stanford.edu/neurogradprogram.html">
                Stanford Neurosciences Graduate Program
              </a>
            </h5>

            <hr />

            <Container>
              <Row>
                <Col xs="8" lg="7">
                  <a href="http://neuroailab.stanford.edu/">
                    <h6>Stanford NeuroAI Lab</h6>
                  </a>
                  <p>PI: Dan Yamins</p>
                </Col>
                <Col xs="4" lg="5">
                  <img
                    src={snail_logo}
                    alt="SNAIL Logo"
                    className="full-width"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs="8" lg="7">
                  <a href="http://vpnl.stanford.edu/">
                    <h6>Stanford Vision & Perception Neuroscience Lab</h6>
                  </a>
                  <p>PI: Kalanit Grill-Spector</p>
                </Col>
                <Col xs="4" lg="5">
                  <img src={vpnl_logo} alt="VPNL Logo" className="full-width" />
                </Col>
              </Row>
            </Container>

            <hr />
            <Link to="/About">
              <Button outline color="primary">
                CV
              </Button>
            </Link>
            {` `}
            <Link to="/">
              <Button outline color="primary">
                Research
              </Button>
            </Link>
            {` `}
            <Link to="/">
              <Button outline color="primary">
                Contact
              </Button>
            </Link>
            {` `}
          </Col>
          <Col xs="12" lg="4">
            <Container>
              <Row>
                <Col xs="12" lg="12">
                  <img
                    src={splash}
                    alt="Headshot of Eshed"
                    className="circle full-width"
                    id="clouds-rest"
                    href="#"
                  />
                  <UncontrolledTooltip placement="top" target="clouds-rest">
                    This is me on a hike to Cloud's Rest in Yosemite, CA!
                  </UncontrolledTooltip>
                  <p className="center-text anonymous">
                    eshedm [at] stanford [dot] edu
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs="12" lg="4">
            <Container>
              <Row>
                <Col xs="12" lg="12">
                  <hr />
                  <p>
                    I'm a neuroscience graduate student with an interest in
                    vision, computational neuroscience, artificial intelligence,
                    and neuroimaging! To learn more or to see some of my past
                    work, please check out my{" "}
                    <Link to="/">research interests</Link>, or my{" "}
                    <Link to="/">CV</Link>.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs="3" lg="3">
                  <Button
                    outline
                    color="secondary"
                    href="https://scholar.google.com/citations?user=ijttsicAAAAJ&hl=en&oi=ao"
                  >
                    <FaGoogle size={ICON_SIZE} color={ICON_COLOR} />
                  </Button>
                </Col>
                <Col xs="3" lg="3">
                  <Button
                    outline
                    color="secondary"
                    href="https://github.com/eshedmargalit"
                  >
                    <FaGithub size={ICON_SIZE} color={ICON_COLOR} />
                  </Button>
                </Col>
                <Col xs="3" lg="3">
                  <Button
                    outline
                    color="secondary"
                    href="https://twitter.com/eshedmargalit"
                  >
                    <FaTwitter size={ICON_SIZE} color={ICON_COLOR} />
                  </Button>
                </Col>
                <Col xs="3" lg="3">
                  <Button
                    outline
                    color="secondary"
                    href="https://www.linkedin.com/in/eshed-margalit-437222a7"
                  >
                    <FaLinkedin size={ICON_SIZE} color={ICON_COLOR} />
                  </Button>
                </Col>
                <Col lg="12">
                  <hr />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Intro;
