import React, { Component, Fragment } from "react";
import {
  Button,
  Collapse,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "reactstrap";

import cv_file from "../../json/CV.json";
import "./CV.css";
import {
  FaFilePdf,
  FaHandHoldingHeart,
  FaBrain,
  FaPenNib,
  FaUniversity,
  FaUserTie,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaAward,
  FaAngleDown,
  FaAngleUp,
  FaLink,
  FaGithub,
  FaGoogle
} from "react-icons/fa";

import PubGroup from "./PubGroup/PubGroup";

class CV extends Component {
  constructor(props) {
    super(props);
    this.toggle_research = this.toggle_research.bind(this);
    this.toggle_education = this.toggle_education.bind(this);
    this.toggle_publications = this.toggle_publications.bind(this);
    this.toggle_presentations = this.toggle_presentations.bind(this);
    this.toggle_skills = this.toggle_skills.bind(this);
    this.toggle_awards = this.toggle_awards.bind(this);
    this.toggle_teaching = this.toggle_teaching.bind(this);
    this.toggle_service = this.toggle_service.bind(this);

    this.cv = cv_file.CV;

    this.state = {
      research_collapse: false,
      education_collapse: false,
      publications_collapse: false,
      presentations_collapse: false,
      skills_collapse: false,
      awards_collapse: false,
      teaching_collapse: false,
      service_collapse: false
    };
  }

  toggle_research() {
    this.setState({ research_collapse: !this.state.research_collapse });
  }
  toggle_education() {
    this.setState({ education_collapse: !this.state.education_collapse });
  }
  toggle_publications() {
    this.setState({ publications_collapse: !this.state.publications_collapse });
  }
  toggle_presentations() {
    this.setState({
      presentations_collapse: !this.state.presentations_collapse
    });
  }
  toggle_skills() {
    this.setState({ skills_collapse: !this.state.skills_collapse });
  }
  toggle_awards() {
    this.setState({ awards_collapse: !this.state.awards_collapse });
  }
  toggle_teaching() {
    this.setState({ teaching_collapse: !this.state.teaching_collapse });
  }
  toggle_service() {
    this.setState({ service_collapse: !this.state.service_collapse });
  }

  render_education() {
    return (
      <ListGroup>
        <ListGroupItem>
          <Container>
            <Row>
              <Col lg="2">
                <img
                  src="img/SU_Seal_Red.png"
                  alt="Stanford official seal"
                  className="full-width"
                />
              </Col>
              <Col lg="10">
                <h3>Stanford University</h3>
                <p>2016 - Present</p>
                <p>PhD Candidate, Neurosciences Ph.D. Program</p>
              </Col>
            </Row>
          </Container>
        </ListGroupItem>

        <ListGroupItem>
          <Container>
            <Row>
              <Col lg="2">
                <img
                  src="img/USC_Seal.png"
                  alt="USC official seal"
                  className="full-width"
                />
              </Col>
              <Col lg="10">
                <h3>University of Southern California</h3>
                <p>2012 - 2016</p>
                <p>
                  B.S. with Honors in Computational Neuroscience
                  <br />
                  Minor in Computer Science
                </p>
                <p>Cumulative GPA: 3.99</p>
              </Col>
            </Row>
          </Container>
        </ListGroupItem>
      </ListGroup>
    );
  }

  render_research() {
    return (
      <Fragment>
        <h2>Current</h2>
        <ListGroup>
          <ListGroupItem>
            <Container>
              <Row>
                <Col>
                  <h3>
                    Stanford NeuroAI Lab{` `}
                    <Button
                      outline
                      color="link"
                      size="1.5em"
                      href="http://neuroailab.stanford.edu/"
                    >
                      <FaLink />
                    </Button>
                  </h3>
                  <p>
                    2016 - Present
                    <br />
                    <strong>PI: </strong> Dan Yamins
                  </p>
                  <p>
                    <em>
                      Modeling structure and development of primate visual
                      cortex
                    </em>
                  </p>
                </Col>
              </Row>
            </Container>
          </ListGroupItem>

          <ListGroupItem>
            <Container>
              <Row>
                <Col>
                  <h3>
                    Stanford Vision and Perception Neuroscience Lab{` `}
                    <Button
                      outline
                      color="link"
                      size="1.5em"
                      href="http://vpnl.stanford.edu/"
                    >
                      <FaLink />
                    </Button>
                  </h3>
                  <p>
                    2016 - Present
                    <br />
                    <strong>PI: </strong> Kalanit Grill-Spector
                  </p>
                  <p>
                    <em>
                      Characterization of human higher visual cortex via
                      ultra-high-resolution fMRI
                    </em>
                  </p>
                </Col>
              </Row>
            </Container>
          </ListGroupItem>
        </ListGroup>
        <br />
        <h2>Past</h2>
        <ListGroup>
          <ListGroupItem>
            <Container>
              <Row>
                <Col>
                  <h3>
                    USC Image Understanding Lab{` `}
                    <Button
                      outline
                      color="link"
                      size="1.5em"
                      href="http://geon.usc.edu/"
                    >
                      <FaLink />
                    </Button>
                  </h3>
                  <p>
                    2014 - 2016
                    <br />
                    <strong>PI: </strong> Irving Biederman
                  </p>
                  <p>
                    <em>
                      Interrogating object representations in visual cortex and
                      psychophysical correlates of developmental prosopagnosia
                    </em>
                  </p>
                </Col>
              </Row>
            </Container>
          </ListGroupItem>

          <ListGroupItem>
            <Container>
              <Row>
                <Col>
                  <h3>
                    USC Emotion and Cognition Lab{` `}
                    <Button
                      outline
                      color="link"
                      size="1.5em"
                      href="http://gero.usc.edu/labs/matherlab/"
                    >
                      <FaLink />
                    </Button>
                  </h3>
                  <p>
                    2013 - 2014
                    <br />
                    <strong>PI: </strong> Mara Mather
                  </p>
                  <p>
                    <em>
                      Investigating the role of the noradrenergic arousal system
                      in aging and memory
                    </em>
                  </p>
                </Col>
              </Row>
            </Container>
          </ListGroupItem>
        </ListGroup>
      </Fragment>
    );
  }

  render_publications() {
    return (
      <Fragment>
        <Button
          href="https://scholar.google.com/citations?user=ijttsicAAAAJ&hl=en"
          color="secondary"
        >
          <FaGoogle size="1em" /> | My Google Scholar Profile
        </Button>
        <hr />
        <PubGroup name="Published" pubs={this.cv.publications.published} />
        <br />
        <PubGroup name="Preprints" pubs={this.cv.publications.preprints} />
      </Fragment>
    );
  }

  render_presentations() {
    return (
      <Fragment>
        <PubGroup name="Talks" pubs={this.cv.presentations.talks} />
        <br />
        <PubGroup name="Posters" pubs={this.cv.presentations.posters} />
      </Fragment>
    );
  }

  render_skills() {
    return (
      <Container>
        <Row>
          <Col>
            Check out my GitHub to see what I'm up to:
            <Button color="link">
              <FaGithub size="2em" />
            </Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs="12" lg="4">
            <h3>Things I use daily</h3>
            <ListGroup>
              <ListGroupItem>Python</ListGroupItem>
              <ListGroupItem>MATLAB</ListGroupItem>
              <ListGroupItem>Git / Github</ListGroupItem>
              <ListGroupItem>TensorFlow</ListGroupItem>
              <ListGroupItem>Jupyter</ListGroupItem>
            </ListGroup>
          </Col>

          <Col xs="12" lg="4">
            <h3>Things I use pretty often</h3>
            <ListGroup>
              <ListGroupItem>Keras</ListGroupItem>
              <ListGroupItem>HTML/CSS/React/Redux</ListGroupItem>
              <ListGroupItem>C, C++, Java</ListGroupItem>
              <ListGroupItem>Psychtoolbox</ListGroupItem>
              <ListGroupItem>FSL, FreeSurfer</ListGroupItem>
              <ListGroupItem>Photoshop and Illustrator</ListGroupItem>
            </ListGroup>
          </Col>

          <Col xs="12" lg="4">
            <h3>Things I've used before</h3>
            <ListGroup>
              <ListGroupItem>Patch-clamp physiology</ListGroupItem>
              <ListGroupItem>Multi-unit in-vivo recording</ListGroupItem>
              <ListGroupItem>Psychtoolbox</ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }

  render_award = award => {
    let link_render;
    if (award.url === "") {
      link_render = null;
    } else {
      link_render = (
        <Button color="link" href={award.url}>
          <FaLink size="1.5em" />
        </Button>
      );
    }
    return (
      <ListGroupItem>
        <h6>{award.name}</h6>
        <p>{award.dates}</p>
        <p>{award.description}</p>
        {link_render}
      </ListGroupItem>
    );
  };

  render_awards() {
    return (
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {this.cv.awards.map(award => {
                return <span key={award.name}>{this.render_award(award)}</span>;
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }

  render_teaching() {
    return (
      <Container>
        <Row>
          <Col>
            <ListGroup>
              <ListGroupItem>
                <h6>
                  Teaching Assistant, Introduction to Perception (PSYCH 30)
                </h6>
                <p>Fall 2017, 2018</p>
              </ListGroupItem>
              <ListGroupItem>
                <h6>
                  Teaching Assistant,{" "}
                  <a href="https://med.stanford.edu/neurogradprogram/prospective_students/bootcamp.html">
                    Stanford Intensive Neuroscience Bootcamp
                  </a>
                </h6>
                <p>Fall 2017</p>
              </ListGroupItem>
              <ListGroupItem>
                <h6>
                  Instructor,{" "}
                  <a href="https://stanfordesp.org/">Stanford Splash</a>
                </h6>
                <p>Fall 2017</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }

  render_service() {
    return (
      <Container>
        <Row>
          <Col>
            <ListGroup>
              <ListGroupItem>
                <h6>
                  Chair, Society for Neuroscience Nanosymposium: Extrastriate
                  Vision
                </h6>
                <p>2018</p>
              </ListGroupItem>
              <ListGroupItem>
                <h6>
                  Stanford Neurosciences PhD Program Student Program Committee
                </h6>
                <p>2018</p>
              </ListGroupItem>
              <ListGroupItem>
                <h6>Mentor and workshop leader for NSF GRFP Application</h6>
                <p>2017 - 2018</p>
              </ListGroupItem>
              <ListGroupItem>
                <h6>
                  Student Speaker Representative, Stanford Neurosciences PhD
                  Program
                </h6>
                <p>2017 - 2018</p>
              </ListGroupItem>
              <ListGroupItem>
                <h6>Mentor, Stanford Biosciences Student Association</h6>
                <p>2017 - 2018</p>
              </ListGroupItem>
              <ListGroupItem>
                <h6>
                  Student Representative, USC Undergraduate Neuroscience Program
                  Executive Committee
                </h6>
                <p>2015 - 2016</p>
              </ListGroupItem>
              <ListGroupItem>
                <h6>Mentor to undergraduate lab members</h6>
                <p>2013 - present</p>
                <p>
                  Jordan Juarez, Isabel Irawan, Emily Meschke, Rafael Maarek,
                  and Catrina Hacker
                </p>
              </ListGroupItem>
              <ListGroupItem>
                <h6>Team captain, USC Cross Country Club</h6>
                <p>2014 -2015</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    const BUTTON_ICON_SIZE = "2rem";

    const education_toggle_arrow = this.state.education_collapse ? (
      <FaAngleUp />
    ) : (
      <FaAngleDown />
    );
    const research_toggle_arrow = this.state.research_collapse ? (
      <FaAngleUp />
    ) : (
      <FaAngleDown />
    );
    const publications_toggle_arrow = this.state.publications_collapse ? (
      <FaAngleUp />
    ) : (
      <FaAngleDown />
    );
    const presentations_toggle_arrow = this.state.presentations_collapse ? (
      <FaAngleUp />
    ) : (
      <FaAngleDown />
    );
    const skills_toggle_arrow = this.state.skills_collapse ? (
      <FaAngleUp />
    ) : (
      <FaAngleDown />
    );
    const awards_toggle_arrow = this.state.awards_collapse ? (
      <FaAngleUp />
    ) : (
      <FaAngleDown />
    );
    const teaching_toggle_arrow = this.state.teaching_collapse ? (
      <FaAngleUp />
    ) : (
      <FaAngleDown />
    );
    const service_toggle_arrow = this.state.service_collapse ? (
      <FaAngleUp />
    ) : (
      <FaAngleDown />
    );

    return (
      <Container>
        <Row>
          <Col xs="4" lg="4">
            <Container>
              <Row>
                <Col xs="12" lg="12">
                  <img
                    src="img/headshot-sq.png"
                    alt="Headshot of Eshed"
                    className="circle full-width"
                  />
                  <p className="center-text anonymous">
                    eshed.margalit [at] gmail [dot] com
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs="8" lg="8">
            <Container>
              <Row>
                <Col>
                  <h1 className="display-5">Curriculum Vitae</h1>
                  <h6>Current through {this.cv.last_updated}</h6>
                  <p>
                    A hyper-textual version of my CV can be found on this page.
                    If you'd prefer a PDF version, please click below!
                  </p>
                  <p>
                    <Button color="secondary">
                      <FaFilePdf size="3em" />
                      {this.cv.pdf.path} | {this.cv.pdf.size}
                    </Button>
                    {` `}
                    <Button
                      href="https://scholar.google.com/citations?user=ijttsicAAAAJ&hl=en"
                      color="primary"
                    >
                      <FaGoogle size="3em" />
                      {` `}
                      Google Scholar Profile
                    </Button>
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Button
              color="link"
              id="education-drop"
              onClick={this.toggle_education}
            >
              <h2>
                <FaUniversity size={BUTTON_ICON_SIZE} />
                {` `}Education {education_toggle_arrow}
              </h2>
            </Button>
            <em>Education history and current affiliations</em>
            <Collapse isOpen={this.state.education_collapse}>
              <Card>
                <CardBody>{this.render_education()}</CardBody>
              </Card>
            </Collapse>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Button
              color="link"
              id="research-drop"
              onClick={this.toggle_research}
            >
              <h2>
                <FaBrain size={BUTTON_ICON_SIZE} />
                {` `}Research {research_toggle_arrow}
              </h2>
            </Button>
            <em>Labs I've worked in</em>
            <Collapse isOpen={this.state.research_collapse}>
              <Card>
                <CardBody>{this.render_research()}</CardBody>
              </Card>
            </Collapse>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Button
              color="link"
              id="publications-drop"
              onClick={this.toggle_publications}
            >
              <h2>
                <FaPenNib size={BUTTON_ICON_SIZE} />
                {` `}Publications {publications_toggle_arrow}
              </h2>
            </Button>
            <em>Peer-reviewed publications</em>
            <Collapse isOpen={this.state.publications_collapse}>
              <Card>
                <CardBody>{this.render_publications()}</CardBody>
              </Card>
            </Collapse>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Button
              color="link"
              id="presentations-drop"
              onClick={this.toggle_presentations}
            >
              <h2>
                <FaUserTie size={BUTTON_ICON_SIZE} />
                {` `}Presentations {presentations_toggle_arrow}
              </h2>
            </Button>
            <em>Conference posters and talks</em>
            <Collapse isOpen={this.state.presentations_collapse}>
              <Card>
                <CardBody>{this.render_presentations()}</CardBody>
              </Card>
            </Collapse>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Button color="link" id="skills-drop" onClick={this.toggle_skills}>
              <h2>
                <FaLaptopCode size={BUTTON_ICON_SIZE} />
                {` `}Skills {skills_toggle_arrow}
              </h2>
            </Button>
            <em>Methods, programming experience, and other training</em>
            <Collapse isOpen={this.state.skills_collapse}>
              <Card>
                <CardBody>{this.render_skills()}</CardBody>
              </Card>
            </Collapse>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Button color="link" id="awards-drop" onClick={this.toggle_awards}>
              <h2>
                <FaAward size={BUTTON_ICON_SIZE} />
                {` `}Awards {awards_toggle_arrow}
              </h2>
            </Button>
            <em>Grants and awards</em>
            <Collapse isOpen={this.state.awards_collapse}>
              <Card>
                <CardBody>{this.render_awards()}</CardBody>
              </Card>
            </Collapse>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Button
              color="link"
              id="teaching-drop"
              onClick={this.toggle_teaching}
            >
              <h2>
                <FaChalkboardTeacher size={BUTTON_ICON_SIZE} />
                {` `}Teaching {teaching_toggle_arrow}
              </h2>
            </Button>
            <em>Teaching experience</em>
            <Collapse isOpen={this.state.teaching_collapse}>
              <Card>
                <CardBody>{this.render_teaching()}</CardBody>
              </Card>
            </Collapse>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Button
              color="link"
              id="service-drop"
              onClick={this.toggle_service}
            >
              <h2>
                <FaHandHoldingHeart size={BUTTON_ICON_SIZE} />
                {` `}Service {service_toggle_arrow}
              </h2>
            </Button>
            <em>Mentorship and volunteer work</em>
            <Collapse isOpen={this.state.service_collapse}>
              <Card>
                <CardBody>{this.render_service()}</CardBody>
              </Card>
            </Collapse>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CV;
