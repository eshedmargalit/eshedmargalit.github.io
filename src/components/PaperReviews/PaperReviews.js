import React, { Component } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import moment from "moment";

import PaperAWeek from "./PaperAWeek.js";
import review_filenames from "../../json/paper_reviews/index.js";
import "./PaperReviews.css";
import { FaExclamationTriangle } from "react-icons/fa";

class PaperReviews extends Component {
  constructor(props) {
    super(props);
    this.load_and_concat_reviews = this.load_and_concat_reviews.bind(this);
    this.papers = this.load_and_concat_reviews(review_filenames);
    this.review_dates = this.papers.map(paper => {
      return moment(paper.metadata.review_date, "YYYY-MM-DD");
    });
  }

  load_and_concat_reviews = fnames => {
    return fnames.map(fname => {
      const data = require(`../../json/paper_reviews/${fname}`);
      return data;
    });
  };

  render() {
    const siren_emoji = (
      <span role="img" aria-label="siren label">
        🚨
      </span>
    );
    const pawScreenshot = require("../../assets/img/paw.png");
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
            <h6>
              {" "}
              {siren_emoji} Update: Paper-A-Week is now a standalone web app!{" "}
              {siren_emoji}{" "}
            </h6>
            <p>
              This page will no longer be updated with my weekly reviews, but
              I'll keep it for archival purposes. Please visit my public profile
              on the Paper-A-Week website to read my reviews!
            </p>
            <a
              href="https://paperaweek.com/profiles/113214769483919341732"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="primary">My Paper-A-Week Profile</Button>
            </a>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <h6>Paper-A-Week is publicly-available for beta-testing!</h6>
            <p>
              I would love your help testing the beta-version of Paper-A-Week.
              All you need is a Google account to get started. The only favor I
              ask of you is to please help me improve the site by providing
              feedback! No request or note is too small to share.
            </p>
            <a
              href="https://paperaweek.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="success">Start Using Paper-a-Week</Button>
              <br />
              <img
                alt="screenshot of the Paper-a-Week website with Eshed logged in"
                src={pawScreenshot}
                className="paw-image border"
              />
            </a>
            <br />
            <br />
            <h6>Highlighted Features</h6>
            <ul>
              <li>Search, sort, and share your reviews</li>
              <li>Find papers on the internet and auto-import metadata</li>
              <li>Keep a reading list</li>
              <li>Track how many papers you average per week</li>
              <li>Use the standardized form to write consistent reviews</li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h5>
              <FaExclamationTriangle />
              {` `}As of August 2020, this list will no longer be updated{` `}
              <FaExclamationTriangle />
            </h5>
            <p>
              Please visit{" "}
              <a
                href="https://paperaweek.com/profiles/113214769483919341732"
                target="_blank"
                rel="noopener noreferrer"
              >
                my Paper-A-Week profile
              </a>{" "}
              instead.
            </p>
            <PaperAWeek />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PaperReviews;
