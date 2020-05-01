import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./FeaturedProjects.css";
import projects from "../../../json/featured_projects.json";

class FeaturedProjects extends Component {
  render_project = (src, alt, title) => {
    return (
      <div className="project">
        <img src={src} className="full-width project-image" alt={alt} />
        <p className="project-title">
          <span className="white-background">{title}</span>
        </p>
      </div>
    );
  };

  render_featured_projects = projects => {
    return projects.map(project => {
      const url = project.url;
      const alt_text = project.alt;

      const img_src = require(`../../../assets/img/${project.img_src}`);
      return (
        <Col xs="6" lg="3" key={project.name}>
          <a href={url}>
            {this.render_project(img_src, alt_text, project.name)}
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
