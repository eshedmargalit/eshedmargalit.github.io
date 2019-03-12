import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./PaperReviews.css";
import PaperAWeek from "./PaperAWeek.js";

class PaperReviews extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs="8" lg="8">
            <br />
            <h1>Paper-a-Week</h1>
            One of my goals for my PhD is to develop a literature-reading habit
            that:
            <ul>
              <li>allows me to jot down thoughts in a consistent format</li>
              <li>provides a way to search through those thoughts</li>
              <li>keeps me accountable to a schedule</li>
            </ul>
            Enter <strong> Paper-a-Week</strong>, my attempt to meet those
            goals! I've seen{" "}
            <a
              href="https://github.com/shagunsodhani/papers-I-read"
              target="_blank"
              rel="noopener noreferrer"
            >
              things like this
            </a>{" "}
            elsewhere, but this will be tailored to my personal interests and
            goals.
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <PaperAWeek />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PaperReviews;
