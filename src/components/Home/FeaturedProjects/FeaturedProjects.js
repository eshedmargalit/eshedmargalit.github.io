import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./FeaturedProjects.css";
import projects from "../../../json/featured_projects.json";

class FeaturedProjects extends Component {
  render_featured_projects = projects => {
    return projects.map(project => {
      // const img_src = "img/" + project.img_src;
      const url = project.url;
      const alt_text = project.alt;

      const img_src = require(`../../../assets/img/${project.img_src}`);
      return (
        <Col xs="6" lg="3" key={project.name}>
          <a href={url}>
            <img src={img_src} className="full-width project" alt={alt_text} />
            <p>{project.name}</p>
          </a>
        </Col>
      );
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs="12" lg="12">
            <h3>My recent work at a glance</h3>
          </Col>
        </Row>
        <Row>{this.render_featured_projects(projects.projects)}</Row>
      </Container>
    );
  }
}

export default FeaturedProjects;
