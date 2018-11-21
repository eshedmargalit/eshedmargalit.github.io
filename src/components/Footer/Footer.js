import React, { Component } from "react";
import { Container, Row, Col, UncontrolledTooltip, Button } from "reactstrap";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { GoClippy } from "react-icons/go";

class Footer extends Component {
  render() {
    const handle = "eshed.margalit";
    const domain = "gmail.com";
    return (
      <Container>
        <Row className="vertical-align">
          <Col xs="12" lg="12">
            <hr />
            <p>
              Please get in touch! I'd love to hear from you.{` `}
              <FaEnvelope color="" id={"gmail_address"} size="1.5em" />
              <UncontrolledTooltip
                autohide={false}
                placement="top-end"
                target={"gmail_address"}
              >
                {handle + "@" + domain}
                {` `}
                <Button color="link" size="sm">
                  <GoClippy
                    className="copy-src"
                    data-clipboard-text={handle + "@" + domain}
                    size="1.5em"
                  />
                </Button>{" "}
              </UncontrolledTooltip>
            </p>
            <p>
              Website designed by Eshed, hosted by GitHub:
              <Button
                color="link"
                href="http://github.com/eshedmargalit/eshedmargalit.github.io"
              >
                <FaGithub size="1.5em" />
              </Button>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
