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
            In recent years, I've been trying to develop a literature-reading
            habit that:
            <ul>
              <li>allows me to jot down notes in a consistent format</li>
              <li>provides a way to search through notes and paper metadata</li>
              <li>keeps me accountable to reading on a schedule</li>
            </ul>
            Enter <strong>Paper-a-Week</strong>, my attempt to meet those
            objectives! I've seen{" "}
            <a
              href="https://github.com/shagunsodhani/papers-I-read"
              target="_blank"
              rel="noopener noreferrer"
            >
              things like this
            </a>{" "}
            elsewhere, but the format and content of these entries are meant to
            serve my own interests.
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h6> How this works </h6>
            <ul>
              <li>
                {" "}
                Click through each paper to see my notes about background,
                methods, results, conclusions, and more{" "}
              </li>
              <li>
                {" "}
                The selected paper stays open in a new 'tab', so you can browse
                the rest of the list while leaving the current review open{" "}
              </li>
              <li>
                {" "}
                Each paper has a number of tags, each of which has a unique
                background color. Click tags to search by that keyword!
              </li>
              <li>
                {" "}
                The search bar allows you to search by title, author,
                publication year, or keyword{" "}
              </li>
            </ul>
          </Col>
        </Row>
        <br />
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
