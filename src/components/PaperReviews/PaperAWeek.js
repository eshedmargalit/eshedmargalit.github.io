import React, { Component } from "react";
import {
  Badge,
  Container,
  Row,
  Col,
  ListGroupItem,
  ListGroup,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
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
      searchbar_value: ""
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

  render_papers = papers => {
    const mapped_papers = papers.map(paper => {
      return (
        <ListGroupItem action key={paper.metadata.title} className="review-lgi">
          {this.render_paper_metadata(paper.metadata)}
        </ListGroupItem>
      );
    });
    return <ListGroup>{mapped_papers}</ListGroup>;
  };

  render() {
    return (
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
  }
}

export default PaperAWeek;
