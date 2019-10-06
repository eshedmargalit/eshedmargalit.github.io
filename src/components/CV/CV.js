import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Button,
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
  FaLink,
  FaGithub,
  FaGoogle,
  FaGraduationCap,
  FaTwitter,
  FaLinkedin,
  FaCommentDots
} from "react-icons/fa";
import StanfordSeal from "../../assets/img/SU_Seal_Red.png";
import usc_seal from "../../assets/img/USC_Seal.png";
import headshot from "../../assets/img/headshot-sq.png";
import snail_logo from "../../assets/img/snail-sq.png";
import vpnl_logo from "../../assets/img/vpnl.png";
import iul_logo from "../../assets/img/geon_brain.png";
import emcog_logo from "../../assets/img/emcog.jpg";

import PubGroup from "./PubGroup/PubGroup";
import CVSection from "./CVSection";

const ICON_COLOR = "#8c1313";
const ICON_SIZE = "40px";
const buttons = [
  {
    link: "https://scholar.google.com/citations?user=ijttsicAAAAJ&hl=en&oi=ao",
    text: "Google Scholar",
    icon: <FaGraduationCap color={ICON_COLOR} size={ICON_SIZE} />
  },
  {
    link: "https://github.com/eshedmargalit",
    text: "GitHub",
    icon: <FaGithub color={ICON_COLOR} size={ICON_SIZE} />
  },
  {
    link: "https://twitter.com/eshedmargalit",
    text: "Twitter",
    icon: <FaTwitter color={ICON_COLOR} size={ICON_SIZE} />
  },
  {
    link: "https://www.linkedin.com/in/eshed-margalit-437222a7",
    text: "LinkedIn",
    icon: <FaLinkedin color={ICON_COLOR} size={ICON_SIZE} />
  }
];

class CV extends Component {
  constructor(props) {
    super(props);

    this.cv = cv_file.CV;
  }

  render_buttons() {
    const cols = buttons.map(button => {
      return (
        <Col lg="3" xs="3" key={button.link}>
          <Button className="hover-button" color="link">
            <a href={button.link} target="_blank" rel="noopener noreferrer">
              {button.icon}
            </a>
          </Button>
        </Col>
      );
    });
    return <Row>{cols}</Row>;
  }

  render_education() {
    return (
      <ListGroup>
        <ListGroupItem>
          <Container>
            <Row>
              <Col xs="6" lg="2">
                <img
                  src={StanfordSeal}
                  alt="Stanford official seal"
                  className="full-width"
                />
              </Col>
              <Col lg="10">
                <h5>Stanford University</h5>
                <p>2016 - Present</p>
                <p>PhD Candidate, Neurosciences PhD Program</p>
              </Col>
            </Row>
          </Container>
        </ListGroupItem>

        <ListGroupItem>
          <Container>
            <Row>
              <Col xs="6" lg="2">
                <img
                  src={usc_seal}
                  alt="USC official seal"
                  className="full-width"
                />
              </Col>
              <Col lg="10">
                <h5>University of Southern California</h5>
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
        <h5>Current</h5>
        <ListGroup>
          <ListGroupItem>
            <Container>
              <Row>
                <Col lg="2" xs="6">
                  <img
                    src={snail_logo}
                    className="full-width"
                    alt="Stanford NeuroAI Lab Logo"
                  />
                </Col>
                <Col lg="10" xs="10">
                  <h6>
                    Stanford NeuroAI Lab{` `}
                    <Button
                      outline
                      color="link"
                      size="1.5em"
                      href="http://neuroailab.stanford.edu/"
                    >
                      <FaLink />
                    </Button>
                  </h6>
                  <p>
                    2016 - Present
                    <br />
                    PI: Dan Yamins
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
                <Col lg="2" xs="6">
                  <img src={vpnl_logo} className="full-width" alt="VPNL logo" />
                </Col>
                <Col lg="10" xs="10">
                  <h6>
                    Stanford Vision and Perception Neuroscience Lab{` `}
                    <Button
                      outline
                      color="link"
                      size="1.5em"
                      href="http://vpnl.stanford.edu/"
                    >
                      <FaLink />
                    </Button>
                  </h6>
                  <p>
                    2016 - Present
                    <br />
                    PI: Kalanit Grill-Spector
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
        <h5>Past</h5>
        <ListGroup>
          <ListGroupItem>
            <Container>
              <Row>
                <Col lg="2" xs="6">
                  <img
                    src={iul_logo}
                    className="full-width"
                    alt="IUL lab logo"
                  />
                </Col>
                <Col lg="10" xs="10">
                  <h6>
                    USC Image Understanding Lab{` `}
                    <Button
                      outline
                      color="link"
                      size="1.5em"
                      href="http://geon.usc.edu/"
                    >
                      <FaLink />
                    </Button>
                  </h6>
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
                <Col lg="2" xs="6">
                  <img
                    src={emcog_logo}
                    className="full-width"
                    alt="Emotion and Cognition Lab Logo"
                  />
                </Col>
                <Col lg="10" xs="10">
                  <h6>
                    USC Emotion and Cognition Lab{` `}
                    <Button
                      outline
                      color="link"
                      size="1.5em"
                      href="http://gero.usc.edu/labs/matherlab/"
                    >
                      <FaLink />
                    </Button>
                  </h6>
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
              <ListGroupItem>Google TPUv2</ListGroupItem>
              <ListGroupItem>HTML/CSS/React/Redux</ListGroupItem>
              <ListGroupItem>C, C++, Java</ListGroupItem>
              <ListGroupItem>FSL</ListGroupItem>
              <ListGroupItem>FreeSurfer</ListGroupItem>
              <ListGroupItem>Photoshop and Illustrator</ListGroupItem>
            </ListGroup>
          </Col>

          <Col xs="12" lg="4">
            <h3>Things I've used before</h3>
            <ListGroup>
              <ListGroupItem>Patch-clamp physiology</ListGroupItem>
              <ListGroupItem>Multi-unit in-vivo recording</ListGroupItem>
              <ListGroupItem>Psychtoolbox, PsychoPy</ListGroupItem>
              <ListGroupItem>Spike sorting (KiloSort)</ListGroupItem>
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
              <ListGroupItem>
                <h6>
                  Instructor,{" "}
                  <a href="https://med.stanford.edu/neurogradprogram/news_and_events/news/brain-day.html">
                    Stanford Brain Day
                  </a>
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
                  Co-Leader,{" "}
                  <a href="http://stanford-cnjc.github.io">
                    Stanford Computational Neuroscience Journal Club (CNJC)
                  </a>
                </h6>
                <p>2018, 2019</p>
              </ListGroupItem>
              <ListGroupItem>
                <h6>Stanford Neurosciences PhD Program Student Mentor</h6>
                <p>2019</p>
              </ListGroupItem>
              <ListGroupItem>
                <h6>
                  Stanford Neurosciences PhD Program Student Program Committee
                </h6>
                <p>2018</p>
              </ListGroupItem>
              <ListGroupItem>
                <h6>Mentor and workshop leader for NSF GRFP Application</h6>
                <p>2017, 2018, 2019</p>
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
                <p>2017 - 2019</p>
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

  render_scicomm() {
    return (
      <Container>
        <Row>
          <Col>
            <ListGroup>
              <ListGroupItem>
                <h6>Back to Basics with Visual Feedbacks</h6>
                <p>
                  Summary of{" "}
                  <a href="https://www.ncbi.nlm.nih.gov/pubmed/29662217">
                    Marques et al., 2018
                  </a>
                </p>
                <Button
                  color="link"
                  href="http://www.neuwritewest.org/blog/back-to-basics-with-visual-feedbacks"
                >
                  <FaLink size="1.5em" /> Link to Blog Post
                </Button>
              </ListGroupItem>
              <ListGroupItem>
                <h6>Nurturing the Study of Nature</h6>
                <p>
                  Summary of{" "}
                  <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0148405">
                    Grunspan et al., 2016
                  </a>
                </p>
                <Button
                  color="link"
                  href="http://www.neuwritewest.org/blog/nurturing-the-study-of-nature"
                >
                  <FaLink size="1.5em" /> Link to Blog Post
                </Button>
              </ListGroupItem>
              <ListGroupItem>
                <h6>Paper a Week</h6>
                <p>
                  {" "}
                  For more, check out my{" "}
                  <Link to="/PaperReviews">Paper-A-Week</Link> page, where I
                  review in detail one paper each week!{" "}
                </p>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    const BUTTON_ICON_SIZE = "1em";

    return (
      <Container>
        <Row>
          <Col xs="8" lg="4">
            <Container>
              <Row>
                <Col>
                  <br />
                  <h1 className="display-5">Curriculum Vitae</h1>
                  <h6>Current through {this.cv.last_updated}</h6>
                  <p>
                    An interactive version of my CV can be found below. If you'd
                    prefer a PDF version, please click this link instead.
                  </p>
                  <p>
                    <Button
                      color="secondary"
                      href={"files/" + this.cv.pdf.path}
                    >
                      <FaFilePdf size="3em" />
                      {this.cv.pdf.path}
                    </Button>
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs="8" lg="4">
            <Container>
              <Row>
                <Col xs="12" lg="12">
                  <img
                    src={headshot}
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
          <Col xs="8" lg="4">
            <Container>
              <Row>
                <Col xs="12" lg="12">
                  <hr />
                  <p>
                    I'm a neuroscience graduate student at Stanford with an
                    interest in vision, computational neuroscience, artificial
                    intelligence, and neuroimaging.
                  </p>
                  <hr />
                </Col>
              </Row>
              <Row>
                <Col>
                  {this.render_buttons()}
                  <hr />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <CVSection
              default_open={true}
              title="Education"
              icon=<FaUniversity size={BUTTON_ICON_SIZE} />
              description="Education history and current affiliations"
              internal={this.render_education()}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <CVSection
              default_open={true}
              title="Research"
              icon=<FaBrain size={BUTTON_ICON_SIZE} />
              description="Labs I've worked in"
              internal={this.render_research()}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <CVSection
              default_open={true}
              title="Publications"
              icon=<FaPenNib size={BUTTON_ICON_SIZE} />
              description="Peer-reviewed publications"
              internal={this.render_publications()}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <CVSection
              default_open={true}
              title="Presentations"
              icon=<FaUserTie size={BUTTON_ICON_SIZE} />
              description="Conference posters and talks"
              internal={this.render_presentations()}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <CVSection
              default_open={true}
              title="Skills"
              icon=<FaLaptopCode size={BUTTON_ICON_SIZE} />
              description="Methods, programming, and other training"
              internal={this.render_skills()}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <CVSection
              default_open={true}
              title="Awards"
              icon=<FaAward size={BUTTON_ICON_SIZE} />
              description="Grants, awards, and recognitions"
              internal={this.render_awards()}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <CVSection
              default_open={true}
              title="Teaching"
              icon=<FaChalkboardTeacher size={BUTTON_ICON_SIZE} />
              description="Teaching experience"
              internal={this.render_teaching()}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <CVSection
              default_open={true}
              title="Service"
              icon=<FaHandHoldingHeart size={BUTTON_ICON_SIZE} />
              description="Mentorship and volunteer work"
              internal={this.render_service()}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <CVSection
              default_open={true}
              title="Science Communication"
              icon=<FaCommentDots size={BUTTON_ICON_SIZE} />
              description="Writing about others' science"
              internal={this.render_scicomm()}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CV;
