import React, { Component } from "react";
import { Container, Row, Col, Button, UncontrolledTooltip } from "reactstrap";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaGraduationCap
} from "react-icons/fa";
import { Link } from "react-router-dom";

import "./Intro.css";
import snail_logo from "../../../assets/img/snail-sq.png";
import vpnl_logo from "../../../assets/img/vpnl.png";
import clouds_rest from "../../../assets/img/clouds_rest.png";

const ICON_COLOR = "#8c1313";
const ICON_SIZE = "40px";
const buttons = [
  {
    link: "https://scholar.google.com/citations?user=ijttsicAAAAJ&hl=en&oi=ao",
    text: "Google Scholar",
    icon: <FaGraduationCap color={ICON_COLOR} size={ICON_SIZE} />
  },
  {
    link: "https://github.com/eshedmargalit",
    text: "GitHub",
    icon: <FaGithub color={ICON_COLOR} size={ICON_SIZE} />
  },
  {
    link: "https://twitter.com/eshedmargalit",
    text: "Twitter",
    icon: <FaTwitter color={ICON_COLOR} size={ICON_SIZE} />
  },
  {
    link: "https://www.linkedin.com/in/eshed-margalit-437222a7",
    text: "LinkedIn",
    icon: <FaLinkedin color={ICON_COLOR} size={ICON_SIZE} />
  }
];

class Intro extends Component {
  render_buttons() {
    const cols = buttons.map(button => {
      return (
        <Col lg="3" xs="3" key={button.link}>
          <Button className="hover-button" color="link">
            <a href={button.link} target="_blank" rel="noopener noreferrer">
              {button.icon}
            </a>
          </Button>
        </Col>
      );
    });
    return <Row>{cols}</Row>;
  }

  render() {
    return (
      <Container className="vertical-align">
        <Row className="vertical-align">
          <Col xs="8" lg="4">
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
            <Link to="/CV">
              <Button outline color="primary">
                CV
              </Button>
            </Link>
            {` `}
            <Link to="/Research">
              <Button outline color="primary">
                Research
              </Button>
            </Link>
            {` `}
          </Col>
          <Col xs="8" lg="4">
            <Container>
              <Row>
                <Col xs="12" lg="12">
                  <img
                    src={clouds_rest}
                    alt="Headshot of Eshed"
                    className="circle full-width"
                    id="clouds-rest"
                    href="#"
                  />
                  <UncontrolledTooltip placement="top" target="clouds-rest">
                    This is me on a hike to Cloud's Rest in Yosemite, CA!
                  </UncontrolledTooltip>
                  <p className="center-text anonymous">
                    eshed.margalit [at] gmail [dot] com
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs="8" lg="4">
            <Container>
              <Row>
                <Col xs="12" lg="12">
                  <hr />
                  <p>
                    I'm a neuroscience graduate student with an interest in
                    vision, computational neuroscience, artificial intelligence,
                    and neuroimaging! To learn more or to see some of my past
                    work, please check out my{" "}
                    <Link to="/Research">research interests</Link>, or my{" "}
                    <Link to="/CV">CV</Link>. I also run the{" "}
                    <a href="http://stanford-cnjc.github.io">
                      Stanford Computational Neuroscience Journal Club
                    </a>
                    , check it out!
                  </p>
                </Col>
              </Row>
              {this.render_buttons()}
              <hr />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Intro;
