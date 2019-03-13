import React, { Component } from "react";
import {
  Badge,
  Button,
  Container,
  Row,
  Col,
  ListGroupItem,
  ListGroup,
  Form,
  FormGroup,
  Label,
  Nav,
  NavItem,
  NavLink,
  Input
} from "reactstrap";
import { FaArrowLeft } from "react-icons/fa";
import moment from "moment";
import "./PaperReviews.css";
import Fuse from "fuse.js";
import review_filenames from "../../json/paper_reviews/index.js";

class PaperAWeek extends Component {
  constructor(props) {
    super(props);
    this.load_and_concat_reviews = this.load_and_concat_reviews.bind(this);
    this.papers = this.load_and_concat_reviews(review_filenames);

    this.state = {
      query: "",
      searchbar_value: "",
      active_paper: null,
      viewing_paper: false,
      current_paper_short_title: "Margalit et al., 2019"
    };
  }

  load_and_concat_reviews = fnames => {
    return fnames.map(fname => {
      const data = require(`../../json/paper_reviews/${fname}`);
      return data;
    });
  };

  render_authors = authors => {
    return authors.map((author, i) => {
      let to_render;
      if (i === authors.length - 1) {
        // last
        if (authors.length === 1) {
          to_render = (
            <span>
              {author}
              <br />
            </span>
          );
        } else {
          to_render = (
            <span>
              and {author}
              <br />
            </span>
          );
        }
      } else if (i === authors.length - 2) {
        // penultimate
        to_render = (
          <span>
            {author}
            {` `}
          </span>
        );
      } else {
        //all others
        to_render = (
          <span>
            {author},{` `}
          </span>
        );
      }
      return <span key={authors.tag + author}>{to_render}</span>;
    });
  };

  handleSearch = search_term => {
    this.setState({
      query: search_term,
      searchbar_value: search_term
    });
  };

  render_paper_metadata = meta => {
    const tags = meta.keywords;

    let tag_render = null;
    if (tags) {
      tag_render = tags.map(tag => {
        return (
          <span key={tag}>
            <Badge
              color="secondary"
              className="tag-badge"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                this.handleSearch(`${e.target.innerHTML}`);
              }}
              href="#"
              pill
            >
              {tag}
            </Badge>
            {` `}
          </span>
        );
      });
    }

    return (
      <div>
        <div>
          <h5>{meta.title}</h5>
          {this.render_authors(meta.authors)}
        </div>
        <div>{tag_render}</div>
      </div>
    );
  };

  trim_reviews = reviews => {
    if (this.state.query === "") {
      return reviews;
    }
    var options = {
      shouldSort: false,
      threshold: 0.2,
      location: 0,
      distance: 5000,
      maxPatternLength: 32,
      minMatchCharLength: 4,
      keys: [
        "metadata.title",
        "metadata.authors",
        "metadata.keywords",
        "metadata.date"
      ]
    };

    var fuse = new Fuse(reviews, options);
    const results = fuse.search(this.state.query);
    return results;
  };

  review_clicked = review => {
    const year = review.metadata.date.substring(0, 4);
    const authors = review.metadata.authors;
    const n_authors = authors.length;

    let author_string;
    if (n_authors === 2) {
      author_string =
        authors[0].split(",")[0] + " and " + authors[1].split(",")[0];
    } else if (n_authors === 1) {
      author_string = authors[0].split(",")[0];
    } else {
      author_string = authors[0].split(",")[0] + " et al.";
    }

    const tab_str = author_string + ", " + year;

    this.setState({
      active_paper: review,
      viewing_paper: true,
      current_paper_short_title: tab_str
    });
  };

  render_papers = papers => {
    const mapped_papers = papers.map(paper => {
      return (
        <ListGroupItem
          action
          key={paper.metadata.title}
          className="review-lgi"
          onClick={e => {
            this.review_clicked(paper);
          }}
        >
          {this.render_paper_metadata(paper.metadata)}
        </ListGroupItem>
      );
    });
    return <ListGroup>{mapped_papers}</ListGroup>;
  };

  render_review = paper => {
    const summary = (
      <div>
        <h6>General Summary</h6>
        <ul>
          {paper.review.summary.map(summary_point => {
            return <li key={summary_point}>{summary_point}</li>;
          })}
        </ul>
      </div>
    );

    const background = (
      <div>
        <h6>Background</h6>
        <ul>
          {paper.review.background.map(background_point => {
            return <li key={background_point}>{background_point}</li>;
          })}
        </ul>
      </div>
    );

    const approach = (
      <div>
        <h6>Approach and Methods</h6>
        <ul>
          {paper.review.approach.map(approach_point => {
            return <li key={approach_point}>{approach_point}</li>;
          })}
        </ul>
      </div>
    );

    const results = (
      <div>
        <h6>Results</h6>
        <ul>
          {paper.review.results.map(results_point => {
            return <li key={results_point}>{results_point}</li>;
          })}
        </ul>
      </div>
    );

    const conclusions = (
      <div>
        <h6>Conclusions</h6>
        <ul>
          {paper.review.conclusions.map(conclusions_point => {
            return <li key={conclusions_point}>{conclusions_point}</li>;
          })}
        </ul>
      </div>
    );

    const other = (
      <div>
        <h6>Other information</h6>
        <ul>
          {paper.review.other.map(other_point => {
            return <li key={other_point}>{other_point}</li>;
          })}
        </ul>
      </div>
    );

    const date_str = moment(paper.metadata.date, "YYYY-MM").format("MMMM YYYY");
    let doi_tag = null;
    if (paper.metadata.doi) {
      doi_tag = (
        <a
          href={"http://dx.doi.org/" + paper.metadata.doi}
          target="_blank"
          rel="noopener noreferrer"
        >
          ({paper.metadata.doi})
        </a>
      );
    }

    return (
      <Container>
        <Row>
          <Col>
            <h4>{paper.metadata.title}</h4>
            {this.render_authors(paper.metadata.authors)}
            Published in {paper.metadata.journal} in {date_str}
            {` `}
            {doi_tag}
            <hr />
            {summary}
            {background}
            {approach}
            {results}
            {conclusions}
            {other}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={e => {
                this.setState({ viewing_paper: false });
              }}
              color="primary"
            >
              <FaArrowLeft /> Back to Review List
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };

  render() {
    const directory = (
      <Container>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label for="search_input">
                  Search by author, year, title, or keyword:
                </Label>
                <Input
                  type="text"
                  id="search_input"
                  onChange={e => this.handleSearch(`${e.target.value}`)}
                  placeholder="e.g., orthogonal"
                  value={this.state.searchbar_value}
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>{this.render_papers(this.trim_reviews(this.papers))}</Col>
        </Row>
      </Container>
    );

    let to_render = directory;
    let nav = (
      <Nav tabs>
        <NavItem>
          <NavLink
            className="nav-tab"
            // action
            // onClick={e => {
            //   this.setState({ viewing_paper: false });
            // }}
            active={!this.state.viewing_paper}
          >
            Review List
          </NavLink>
        </NavItem>
      </Nav>
    );

    if (this.state.active_paper) {
      if (this.state.viewing_paper) {
        to_render = this.render_review(this.state.active_paper);
      } else {
        to_render = directory;
      }
      nav = (
        <Nav tabs>
          <NavItem>
            <NavLink
              className="nav-tab"
              onClick={e => {
                this.setState({ viewing_paper: false });
              }}
              active={!this.state.viewing_paper}
            >
              Review List
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="nav-tab"
              onClick={e => {
                this.setState({ viewing_paper: true });
              }}
              active={this.state.viewing_paper}
            >
              {this.state.current_paper_short_title}
            </NavLink>
          </NavItem>
        </Nav>
      );
    }
    return (
      <div>
        {nav}
        <br />
        {to_render}
      </div>
    );
  }
}

export default PaperAWeek;
