import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { FaLink } from "react-icons/fa";

class PubGroup extends Component {
  render_author = author => {
    if (author === "Margalit, E.") {
      return <strong>{author}</strong>;
    } else {
      return <span>{author}</span>;
    }
  };

  render_authors = authors => {
    return authors.map((author, i) => {
      var author_info = this.render_author(author);

      let to_render;

      if (i === authors.length - 1) {
        // last
        if (authors.length === 1) {
          to_render = (
            <span>
              {author_info}
              <br />
            </span>
          );
        } else {
          to_render = (
            <span>
              and {author_info}
              <br />
            </span>
          );
        }
      } else if (i === authors.length - 2) {
        // penultimate
        to_render = (
          <span>
            {author_info}
            {` `}
          </span>
        );
      } else {
        //all others
        to_render = (
          <span>
            {author_info},{` `}
          </span>
        );
      }
      return <span key={authors.url + author}>{to_render}</span>;
    });
  };

  render_pub = pub => {
    pub.authors.url = pub.url;
    return (
      <ListGroupItem>
        <p>{pub.year}</p>
        <h5>{pub.title}</h5>
        {this.render_authors(pub.authors)}
        <p>
          <em>
            {pub.journal}
            {pub.volume}
            {pub.pages}
          </em>
        </p>
        <Button color="link" href={pub.url}>
          <FaLink size="1.5em" />
        </Button>
      </ListGroupItem>
    );
  };
  render_pubs = pubs => {
    return pubs.map(pub => {
      return <span key={pub.url}>{this.render_pub(pub)}</span>;
    });
  };

  render() {
    if (this.props.pubs.length === 0) {
      return null;
    }
    return (
      <Container>
        <Row>
          <Col>
            <ListGroup>
              <h3>{this.props.name}</h3>
              {this.render_pubs(this.props.pubs)}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PubGroup;
