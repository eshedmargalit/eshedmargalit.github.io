import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  UncontrolledTooltip
} from "reactstrap";
import { FaGoogle, FaLink } from "react-icons/fa";
import "./Research.css";

import project_file from "../../json/projects.json";

class Research extends Component {
  render_projects = projects => {
    return projects.map(project => {
      let link_render;
      if (project.url === "") {
        link_render = null;
      } else {
        link_render = (
          <Button color="secondary" href={project.url}>
            <FaLink /> {` `} {project.url_text}
          </Button>
        );
      }
      return (
        <span key={project.name}>
          <ListGroupItem>
            <Row>
              <Col lg="9">
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                {link_render}
              </Col>
              <Col lg="3">
                <img
                  src={project.img_src}
                  alt={project.alt}
                  id={project.id}
                  className="circle full-width"
                />
                <UncontrolledTooltip placement="top" target={project.id}>
                  {project.alt}
                </UncontrolledTooltip>
              </Col>
            </Row>
          </ListGroupItem>
        </span>
      );
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Projects I've worked on</h1>
            <p>
              This is an incomplete list of projects that have interested me,
              please get in touch if you'd like to chat further about any of
              these things!
            </p>
            <Button
              href="https://scholar.google.com/citations?user=ijttsicAAAAJ&hl=en"
              color="primary"
            >
              <FaGoogle size="1em" /> | My Google Scholar Profile
            </Button>
            <hr />
          </Col>
        </Row>
        <ListGroup>{this.render_projects(project_file.projects)}</ListGroup>
      </Container>
    );
  }
}

export default Research;
