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
import moment from "moment";

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
      return <span key={authors.tag + author}>{to_render}</span>;
    });
  };

  render_pub = pub => {
    pub.authors.tag = pub.tag;
    let link_render;
    if (pub.url === "") {
      link_render = null;
    } else {
      link_render = (
        <Button color="link" target="_blank" href={pub.url}>
          <FaLink size="1.5em" />
        </Button>
      );
    }
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
        {link_render}
      </ListGroupItem>
    );
  };
  render_pubs = pubs => {
    return pubs.map(pub => {
      return <span key={pub.tag}>{this.render_pub(pub)}</span>;
    });
  };

  render() {
    if (this.props.pubs.length === 0) {
      return null;
    }
    // descending sort
    this.props.pubs.sort((a, b) => -moment(a.year).diff(moment(b.year)));
    return (
      <Container>
        <Row>
          <Col>
            <ListGroup>
              <h4>{this.props.name}</h4>
              {this.render_pubs(this.props.pubs)}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PubGroup;
