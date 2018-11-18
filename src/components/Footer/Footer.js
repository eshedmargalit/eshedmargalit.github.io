import React, { Component } from "react";
import { Container, Row, Col, UncontrolledTooltip, Button } from "reactstrap";
import { FaEnvelope } from "react-icons/fa";
import { GoClippy } from "react-icons/go";

class Footer extends Component {
  render() {
    const grouphandle = "stanford-cnjc";
    const groupdomain = "gmail.com";
    return (
      <Container>
        <Row className="vertical-align">
          <Col xs="12" lg="12">
            <hr />
            <p>
              <strong>
                <em>Questions? Comments? Ideas?</em>
              </strong>
            </p>
            <p>
              Check out the designated{` `}
              <a href="https://groups.google.com/forum/#!forum/stanford-cnjc">
                Google Group
              </a>
              {` `}
              or{` `}
              <span>
                drop us an email{" "}
                <FaEnvelope color="#8c1313" id={"EmailLelandStanford"} />
                <UncontrolledTooltip
                  autohide={false}
                  placement="top-end"
                  target={"EmailLelandStanford"}
                >
                  {grouphandle + "@" + groupdomain}
                  {` `}
                  <Button color="link" size="sm">
                    <GoClippy
                      className="copy-src"
                      data-clipboard-text={grouphandle + "@" + groupdomain}
                      size="1em"
                    />
                  </Button>{" "}
                </UncontrolledTooltip>
              </span>
              !
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
