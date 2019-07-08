import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Sparklines, SparklinesCurve, SparklinesSpots } from "react-sparklines";
import moment from "moment";

import PaperAWeek from "./PaperAWeek.js";
import review_filenames from "../../json/paper_reviews/index.js";
import "./PaperReviews.css";

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

  compute_ppw() {
    const sorted_dates = this.review_dates.sort((a, b) => a.diff(b));
    const total_weeks =
      sorted_dates[sorted_dates.length - 1].diff(sorted_dates[0], "days") / 7.0;
    return Number.parseFloat(sorted_dates.length / total_weeks).toFixed(3);
  }

  compute_running_avg() {
    const sorted_dates = this.review_dates.sort((a, b) => a.diff(b));

    const running_avg = [1.0];
    for (var i = 0; i < sorted_dates.length - 1; i++) {
      var weeks_from_start =
        sorted_dates[i + 1].diff(sorted_dates[0], "days") / 7.0;
      console.log(weeks_from_start);
      console.log(i + 1);
      running_avg.push((i + 1) / weeks_from_start);
    }

    console.log(running_avg);
    return running_avg;
  }

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
          <Col>
            <br />
            <h5> How am I doing? </h5>
            <p> Papers / week: {this.compute_ppw()} </p>
            <Sparklines data={this.compute_running_avg()} height={75}>
              <SparklinesCurve style={{ fill: "none" }} />
              <SparklinesSpots />
            </Sparklines>
            <p>
              <em>Running average of papers read per week</em>
            </p>
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
