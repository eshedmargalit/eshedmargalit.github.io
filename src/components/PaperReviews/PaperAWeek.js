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
  Nav,
  NavItem,
  NavLink,
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
    return (
      <Container>
        <Row>
          <Col>
            <h5>{paper.metadata.title}</h5>
            <p>
              Quis nostrud exercitation veniam irure non enim minim. Dolor
              labore ut officia id nisi aliquip dolor irure nostrud laboris
              reprehenderit. In officia sint est deserunt labore quis occaecat
              culpa nostrud irure minim est voluptate officia. Do ex culpa
              eiusmod sint dolore et commodo cillum magna aute fugiat qui
              exercitation consectetur. Eu irure anim eiusmod nisi duis occaecat
              exercitation veniam incididunt quis dolor sit aliqua eiusmod.
              Proident ad occaecat non voluptate dolore. Aliqua ea nisi commodo
              laboris consectetur minim dolore laboris voluptate reprehenderit.
              Consequat cillum fugiat officia incididunt sunt. Veniam amet est
              et proident eu elit reprehenderit culpa eu ex occaecat nisi.
              Proident ad ipsum tempor do sint nostrud non nisi dolore excepteur
              quis exercitation qui velit. Commodo sint labore commodo cillum
              irure non tempor sunt. Consectetur ipsum ut amet tempor. Laborum
              pariatur velit incididunt ad mollit laborum Lorem dolor fugiat
              dolor ipsum. Nulla deserunt amet do do reprehenderit minim
              aliquip. Dolor do magna consequat ad ex. Ipsum exercitation
              proident ullamco est sit qui eiusmod consectetur qui. Consectetur
              eiusmod deserunt fugiat sunt labore deserunt excepteur veniam aute
              exercitation labore aute.
            </p>
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
            onClick={e => {
              this.setState({ viewing_paper: false });
            }}
            active={!this.state.viewing_paper}
          >
            Directory
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
              onClick={e => {
                this.setState({ viewing_paper: false });
              }}
              active={!this.state.viewing_paper}
            >
              Directory
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
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
